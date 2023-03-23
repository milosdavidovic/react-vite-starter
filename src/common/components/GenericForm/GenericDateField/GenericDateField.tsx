import { FC, PropsWithChildren } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { FormDateElement } from "../types";
import { useTranslation } from "react-i18next";

interface Props extends PropsWithChildren {
  element: FormDateElement;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  control: Control<FieldValues, any>;
}

const GenericDateField: FC<Props> = ({ control, fieldError, element }) => {
  const { t } = useTranslation();

  return (
    <Controller
      render={({ field }) => (
        <DesktopDatePicker
          {...field}
          label={element.label}
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required={element.required}
              error={!!fieldError}
              helperText={fieldError ? (fieldError.message as string) : ""}
              name={element.name}
              id={element.name}
            />
          )}
        />
      )}
      name={element.name}
      control={control}
      rules={{
        required: element.required ? t("registration.validationError.required") : false,
        validate: (value) => {
          return !value.invalid || t("general.validationError.badFormat");
        },
      }}
      defaultValue=""
    />
  );
};

export default GenericDateField;
