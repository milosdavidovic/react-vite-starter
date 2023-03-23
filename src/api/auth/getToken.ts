import { axios } from "~/libs/axios";
import { APP_CONFIG } from "~/utils/config";

/**
 * getAuthToken
 *
 * @param code - Authorization code returned by the AWS Cognito (OAuth2 authorization code flow)
 * @returns Promise<{data: {access_token: string, id_token: string}}>
 */
export const getAuthToken = (code: string) => {
  const params = new URLSearchParams();

  params.append("grant_type", "authorization_code");
  params.append("client_id", APP_CONFIG.COGNITO_CLIENT_ID);
  params.append("code", code);
  params.append("redirect_uri", APP_CONFIG.COGNITO_REDIRECT_URL);
  params.append("code_verifier", sessionStorage.getItem("codeVerifier") || "");

  return axios.post(`${APP_CONFIG.COGNITO_DOMAIN}/oauth2/token`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
