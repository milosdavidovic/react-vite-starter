import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "~/contexts/AuthContext/AuthContext";
import { authStorage } from "~/utils/auth/authStorage";
import GeneralError from "../GeneralError";
import LoaderFullScreen from "../LoaderFullScreen";

/**
 * Auth - react functional component
 *
 * This component is used as callback url for AWS Cognito hosted UI. When user logs in using
 * username and pass (optionally MFA), user is redirected back to route which loads this component,
 * with authorization code ('code' query param), which can be used to obtain access and id_token (OAuth2 and OIDC).
 */
const Auth = () => {
  const [params] = useSearchParams();

  const code = params.get("code"); //
  const authData = authStorage.getAuthData();
  const { isError, isLoading, login } = useAuthContext();

  useEffect(() => {
    if (code && !authData) {
      login(code);
    }
  }, [code, login, authData]);

  if (isError) return <GeneralError />;

  if (isLoading) return <LoaderFullScreen />;

  return <></>;
};

export default Auth;
