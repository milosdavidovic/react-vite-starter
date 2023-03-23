import { FormControl, FormHelperText, TextField } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormMultiSelectElement } from "../types";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface Props extends PropsWithChildren {
  element: FormMultiSelectElement;
  control: Control<FieldValues, any>;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GenericMultiSelectField: FC<Props> = ({ element, control, fieldError }) => {
  const { t } = useTranslation();

  const getSelectedMultipleValues = (elementName: string, options: { value: string; label: string }[]) => {
    const res = options.filter((o) => {
      return control._fields[elementName]?._f.value?.indexOf(o.value) > -1;
    });

    return res;
  };

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <FormControl sx={{ width: element.width || "100%" }} error={!!fieldError}>
          <Autocomplete
            key={`ac_${element.name}`}
            multiple
            size="small"
            value={getSelectedMultipleValues(element.name, element.options)}
            id={element.name}
            options={element.options}
            disableCloseOnSelect
            getOptionLabel={(option: { value: string; label: string }) => option.label}
            isOptionEqualToValue={(option: { value: string; label: string }, value) => {
              return option.value === value.value;
            }}
            onChange={(event, values) => {
              onChange(values.map((v) => v.value));
            }}
            renderOption={(props, el, { selected }) => (
              <li key={`li_${element.name}`} {...props}>
                <Checkbox
                  key={`cb_${element.name}`}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {el.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField key={`tf_${element.name}`} {...params} error={!!fieldError} label={element.label} />
            )}
          />
          {fieldError && <FormHelperText error>{fieldError ? (fieldError.message as string) : ""}</FormHelperText>}
        </FormControl>
      )}
      key={`controller_${element.name}`}
      name={element.name}
      control={control}
      rules={{
        required: element.required ? t("registration.validationError.required") : false,
      }}
    />
  );
};

export default GenericMultiSelectField;
