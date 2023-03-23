import { forwardRef, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  OutlinedInputProps,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const mapInputSizeToLabelSize = (size: "small" | "medium" | undefined): "small" | "normal" | undefined => {
  return size === "medium" ? "normal" : size;
};

interface Props extends OutlinedInputProps {
  helperText?: string | undefined;
}

const PasswordInput = forwardRef((props: Props, ref) => {
  const { helperText, size, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handleClickShowPassword = () => {
    setShowPassword((s) => !s);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="password" size={mapInputSizeToLabelSize(size)} required={rest.required} error={rest.error}>
        {t("registration.password.label")}
      </InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        size={size}
        inputProps={{
          form: {
            autocomplete: "off",
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={t("registration.password.label")}
        placeholder={t("registration.password.placeholder")}
        ref={ref}
        {...rest}
      />
      {!!rest.error && (
        <FormHelperText error id="password-error">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
