import React, { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Captcha as CustomCaptcha } from "~/common/components/Captcha";

export const useCaptcha = () => {
  const [token, setToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const Captcha = useMemo(() => {
    return function Captcha(props: React.ComponentProps<typeof CustomCaptcha>) {
      return <CustomCaptcha {...props} setRef={recaptchaRef} onChange={setToken} />;
    };
  }, []);

  const getCaptchaToken = () => {
    if (!recaptchaRef?.current) return;

    recaptchaRef.current.getValue();
  };

  const resetCaptcha = () => {
    if (!recaptchaRef?.current) return;

    recaptchaRef.current.reset();
  };

  const executeAsync = () => {
    if (!recaptchaRef?.current) return;

    recaptchaRef.current.executeAsync();
  };

  const execute = () => {
    if (!recaptchaRef?.current) return;

    recaptchaRef.current.execute();
  };

  return {
    Captcha,
    token,
    resetCaptcha,
    getCaptchaToken,
    executeAsync,
    execute,
  };
};
