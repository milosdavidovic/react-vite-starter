import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { UseFormRegister, FieldValues, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { FormTextElement } from "../types";
import { useTranslation } from "react-i18next";
import { TextField, TextFieldProps } from "@mui/material";

const DEFAULT_MAX_LENGTH = 255;

type Props = TextFieldProps & {
  element: FormTextElement;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<FieldValues>;
};

const GenericTextField: FC<Props> = ({ register, element, fieldError, ...rest }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const { onChange, ...restRegister } = useMemo(
    () =>
      register(element.name, {
        required: element.required ? t("registration.validationError.required") : undefined,
        minLength: element.minLength
          ? {
              value: element.minLength,
              message: t("registration.validationError.exactLength", { value: element.minLength }),
            }
          : undefined,
        maxLength: element.maxLength
          ? {
              value: element.maxLength,
              message: t("registration.validationError.exactLength", { value: element.maxLength }),
            }
          : undefined,
      }),
    [element.maxLength, element.minLength, element.name, element.required, register, t],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value === "" || !element.valueRegex || element.valueRegex.test(e.target.value)) {
        onChange(e);
        setValue(e.target.value);
      }
    },
    [element.valueRegex, onChange],
  );

  return (
    <TextField
      sx={{ width: element.width || "100%" }}
      required={element.required}
      size="small"
      fullWidth
      label={element.label}
      id={element.name}
      error={!!fieldError?.message}
      helperText={fieldError ? (fieldError.message as string) : ""}
      value={value}
      onChange={handleChange}
      {...restRegister}
      {...rest}
      inputProps={{
        maxLength: element.inputMaxLength || DEFAULT_MAX_LENGTH,
      }}
    />
  );
};

export default GenericTextField;
