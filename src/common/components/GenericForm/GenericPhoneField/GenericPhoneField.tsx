import { FC } from "react";
import { FieldValues, FieldError, FieldErrorsImpl, Merge, Controller, Control } from "react-hook-form";
import { FormPhoneElement } from "../types";
import { useTranslation } from "react-i18next";
import { TextFieldProps } from "@mui/material";
import PhoneNumberInput from "../../PhoneNumberInput";

type Props = TextFieldProps & {
  element: FormPhoneElement;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  control: Control<FieldValues, any>;
};

const GenericPhoneField: FC<Props> = ({ control, element, fieldError }) => {
  const { t } = useTranslation();

  return (
    <Controller
      render={({ field }) => (
        <PhoneNumberInput
          {...field}
          error={fieldError ? (fieldError.message as string) : ""}
          areaCodeOptions={element.options}
        />
      )}
      name={element.name}
      control={control}
      rules={{ required: t("registration.validationError.required") }}
    />
  );
};

export default GenericPhoneField;
