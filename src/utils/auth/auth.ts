import { APP_CONFIG } from "../config";
import { createPKCEChallenge } from "./pkce";

/**
 * generateTokenUrl
 * @returns AWS Cognito hosted UI url used to provide login, password reset, etc.
 */
export const generateLoginItems = () => {
  const { codeChallenge, codeVerifier } = createPKCEChallenge();

  return {
    loginUrl: `${APP_CONFIG.COGNITO_DOMAIN}/login?client_id=${APP_CONFIG.COGNITO_CLIENT_ID}&response_type=${APP_CONFIG.COGNITO_RESPONSE_TYPE}&scope=${APP_CONFIG.COGNITO_SCOPE}&redirect_uri=${APP_CONFIG.COGNITO_REDIRECT_URL}&code_challenge_method=S256&code_challenge=${codeChallenge}`,
    codeVerifier,
  };
};
