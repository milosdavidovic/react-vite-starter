import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { APP_CONFIG } from "~/utils/config";

/**
 * @param onChange - Callback function to handle the token returned by the reCAPTCHA.
 * @param setRef - Ref to the reCAPTCHA component. Useful when you want to call
 * methods on the reCAPTCHA component (eg. reset).
 */
type CaptchaProps = {
  onChange?: (token: string | null) => void;
  setRef?: React.MutableRefObject<ReCAPTCHA | null>;
};

/**
 * Used for V2 reCAPTCHA.
 *
 * @see https://developers.google.com/recaptcha/docs/display
 * @constructor
 */
export const Captcha = (props: CaptchaProps) => {
  return (
    <ReCAPTCHA
      ref={(r) => {
        if (props.setRef) {
          props.setRef.current = r;
        }
      }}
      sitekey={APP_CONFIG.GOOGLE_RECAPTCHA_SITE_KEY}
      onChange={props.onChange}
    />
  );
};
