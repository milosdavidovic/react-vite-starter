import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAuthToken, refreshAuthToken, useGetUserInfo, UserInfo } from "~/api";
import { authStorage } from "~/utils/auth/authStorage";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { DateTime } from "luxon";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthStatus } from "./types";

const TOKEN_EXPIRY_THRESHOLD_MINUTES = 5;
const TOKEN_CHECK_INTERVAL = 10000;

/**
 * useAuth hook is meant to be used by AuthContext only, do not import it directly in your
 * components code. If you need information about logged in user, please leverage useAuthContext hook.
 *
 * @returns All necessary information about logged in user and login management functions as well.
 *
 */
export const useAuth = () => {
  const intervalRef = useRef<NodeJS.Timer>();
  const client = useQueryClient();
  const [me, setMe] = useState<UserInfo | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.INIT);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  /**
   * This serves a purpose in scenario where user lands on some specific route
   * eg. /onboarding/general-info and already has a token. In that case we want
   * to preserve requested url so we can navigate to it after fetching users data.
   * In case user doesn't have token already, we just redirect to "/" which ultimately
   * leads to login page
   */
  const redirectUrl = authStorage.getAuthData() ? pathname : "/";
  const { refetch } = useGetUserInfo({
    config: {
      onSuccess(data) {
        setMe(data);
        setStatus(AuthStatus.LOGGED_IN);
        navigate(redirectUrl);
      },
      onError() {
        setStatus(AuthStatus.ERROR);
      },
      enabled: false, // we want to control when this gets called with refetch
    },
  });

  const getMeData = useCallback(() => {
    setStatus(AuthStatus.PENDING);
    refetch();
  }, [refetch]);

  const shouldRefreshToken = useCallback((): boolean => {
    const authData = authStorage.getAuthData();

    if (!authData) return false;

    const minutesUntilTokenExpires = DateTime.fromSeconds(authData.tokenExpiresAt).diffNow().toMillis() / 1000 / 60;
    return minutesUntilTokenExpires < TOKEN_EXPIRY_THRESHOLD_MINUTES;
  }, []);

  const refreshToken = useCallback(() => {
    const authData = authStorage.getAuthData();
    refreshAuthToken(authData?.refreshToken || "").then(({ data }) => {
      const { access_token } = data;
      const { exp } = jwtDecode<JwtPayload>(access_token);

      const oldAuthData = authStorage.getAuthData();

      // We will reuse refresh token and Cognito doesn't support refresh token rotation.
      authStorage.setAuthData({
        refreshToken: oldAuthData?.refreshToken || "",
        token: access_token,
        tokenExpiresAt: exp || 0,
      });

      getMeData();
    });
  }, [getMeData]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const authData = authStorage.getAuthData();
      if (!authData?.refreshToken) return;

      if (shouldRefreshToken()) {
        refreshToken();
      }
    }, TOKEN_CHECK_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [shouldRefreshToken, refreshToken]);

  useEffect(() => {
    if (!authStorage.getAuthData()) {
      setStatus(AuthStatus.LOGGED_OUT);
      return;
    }
    getMeData();
  }, [getMeData]);

  const isInit = useMemo(() => status === AuthStatus.INIT, [status]);
  const isPending = useMemo(() => status === AuthStatus.PENDING, [status]);
  const isLoggedIn = useMemo(() => status === AuthStatus.LOGGED_IN, [status]);
  const isError = useMemo(() => status === AuthStatus.ERROR, [status]);

  const login = useCallback(
    (code: string) => {
      setStatus(AuthStatus.PENDING);
      getAuthToken(code).then(({ data }) => {
        const { access_token, refresh_token } = data;
        const { exp } = jwtDecode<JwtPayload>(access_token);

        authStorage.setAuthData({
          token: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: exp || 0,
        });

        getMeData();
      });
    },
    [getMeData],
  );

  const logout = useCallback(() => {
    authStorage.clearAuthData();
    client.clear();
    setStatus(AuthStatus.LOGGED_OUT);
    window.location.reload();
  }, [client]);

  return {
    me,
    login,
    logout,
    getAuthData: authStorage.getAuthData,
    isLoading: isPending || isInit,
    isError,
    isLoggedIn,
  };
};
