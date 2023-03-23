function getAppConfigOrThrow() {
  if (!import.meta.env.VITE_VL_BASE_URL) throw Error("Please set VITE_VL_BASE_URL env variable");
  if (!import.meta.env.VITE_COGNITO_DOMAIN) throw Error("Please set VITE_COGNITO_DOMAIN env variable");
  if (!import.meta.env.VITE_COGNITO_CLIENT_ID) throw Error("Please set VITE_COGNITO_CLIENT_ID env variable");
  if (!import.meta.env.VITE_COGNITO_RESPONSE_TYPE) throw Error("Please set VITE_COGNITO_RESPONSE_TYPE env variable");
  if (!import.meta.env.VITE_COGNITO_SCOPE) throw Error("Please set VITE_COGNITO_SCOPE env variable");
  if (!import.meta.env.VITE_COGNITO_REDIRECT_URL) throw Error("Please set VITE_COGNITO_REDIRECT_URL env variable");
  if (!import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY)
    throw Error("Please set VITE_GOOGLE_RECAPTCHA_SITE_KEY env variable");

  return {
    BASE_URL: import.meta.env.VITE_VL_BASE_URL,
    COGNITO_DOMAIN: import.meta.env.VITE_COGNITO_DOMAIN,
    COGNITO_CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID,
    COGNITO_RESPONSE_TYPE: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
    COGNITO_SCOPE: import.meta.env.VITE_COGNITO_SCOPE,
    COGNITO_REDIRECT_URL: import.meta.env.VITE_COGNITO_REDIRECT_URL,
    MODE: import.meta.env.MODE,
    VL_ENABLE_MOCKING: import.meta.env.VITE_VL_ENABLE_MOCKING,
    GOOGLE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY,
  };
}

export const APP_CONFIG = getAppConfigOrThrow();
