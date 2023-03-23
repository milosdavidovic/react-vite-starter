import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from "@mui/material";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormSelectElement } from "../types";

interface Props extends PropsWithChildren {
  element: FormSelectElement;
  control: Control<FieldValues, any>;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  onChange?: (event: SelectChangeEvent<any>) => void | undefined;
}

const GenericSelectField: FC<Props> = ({ element, control, fieldError, onChange }) => {
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      // if element is removed from the dom, we unregister it so it is not further validated by react hook form
      control.unregister(element.name);
    };
  }, [control, element.name]);

  return (
    <Controller
      render={({ field }) => (
        <FormControl sx={{ width: element.width || "100%" }}>
          <InputLabel required={element.required} size="small" error={!!fieldError} id={`${element.label}-label`}>
            {element.label}
          </InputLabel>
          <Select
            {...field}
            labelId={`${element.label}-label`}
            size="small"
            id={element.name}
            label={element.label}
            error={!!fieldError}
            defaultValue=""
            onChange={(event: SelectChangeEvent<any>, child: ReactNode) => {
              field.onChange(event, child);
              onChange?.(event);
            }}
          >
            {element.options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {fieldError && <FormHelperText error>{fieldError ? (fieldError.message as string) : ""}</FormHelperText>}
        </FormControl>
      )}
      name={element.name}
      control={control}
      rules={{
        required: element.required ? t("registration.validationError.required") : false,
      }}
      defaultValue=""
    />
  );
};

export default GenericSelectField;
