// @flow
import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FCC } from "~/@types/general";
import { APP_CONFIG } from "~/utils/config";

/**
 * Used for V3 reCAPTCHA.
 */
export const CaptchaProvider: FCC = ({ children }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_CONFIG.GOOGLE_RECAPTCHA_SITE_KEY}>{children}</GoogleReCaptchaProvider>
  );
};
