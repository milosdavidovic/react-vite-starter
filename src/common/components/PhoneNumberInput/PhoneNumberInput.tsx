import { Stack, FormControl, TextField, FormHelperText, Autocomplete, Box, createFilterOptions } from "@mui/material";
import React, { FC, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export type Value = { areaCode: string; number: string };
type Option = { label: string; value: string; flag: string };

interface Props {
  areaCodeOptions: Array<Option>;
  defaultValue?: Value;
  value?: Value;
  onChange: (value: Value) => void;
  required?: boolean;
  error?: string;
}

const filterOptions = createFilterOptions({
  stringify: ({ label }: Option) => label,
});

const isOptionEqualToValue = (option: Option, value: Option) => option.label === value.label;

/**
 *
 * PhoneNumberInput
 *
 * Example usage with react hook form:
 *
 *   <Controller
 *     render={({ field }) => <PhoneNumberInput {...field} error={errors?.phone?.message || ""} />}
 *     name="phone"
 *     control={control}
 *     rules={{ required: t("registration.validationError.required") }}
 *   />
 *
 */
const PhoneNumberInput: FC<Props> = React.forwardRef(({ value, onChange, required, error, areaCodeOptions }, _) => {
  const { t } = useTranslation();
  const [area, setArea] = useState<string | undefined>(value?.areaCode || "");
  const [number, setNumber] = useState(value?.number || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNumber(e.target.value);
      onChange({ areaCode: area || "", number: e.target.value });
    }
  };

  const handleSelect = (_: React.SyntheticEvent<Element, Event>, selected: Option) => {
    setArea(selected.value);
    onChange({ areaCode: selected.value, number });
  };

  return (
    <Stack>
      <Stack sx={{ flexDirection: "row", width: "100%", gap: 1 }}>
        <FormControl sx={{ width: required ? 130 : 120 }} required={required} error={!!error && !area}>
          <Autocomplete
            size="small"
            disableClearable
            getOptionLabel={(option) => `(+${option.value})`}
            isOptionEqualToValue={isOptionEqualToValue}
            filterOptions={filterOptions}
            componentsProps={{
              paper: {
                sx: {
                  width: 300,
                },
              },
            }}
            options={areaCodeOptions}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.label}>
                {`${option.flag} ${option.label}`}
              </Box>
            )}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("phoneInput.areaCode.label")}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                  form: {
                    autoComplete: "off",
                  },
                  maxLength: 20,
                }}
              />
            )}
          ></Autocomplete>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
        <TextField
          sx={{ flexGrow: 1 }}
          disabled={!area}
          autoComplete="off"
          size="small"
          label={t("phoneInput.number.label")}
          value={number}
          onChange={handleChange}
          required={required}
          error={!!error}
        />
      </Stack>
    </Stack>
  );
});

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
