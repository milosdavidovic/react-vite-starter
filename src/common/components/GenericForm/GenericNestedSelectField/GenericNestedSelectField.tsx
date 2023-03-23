import { SelectChangeEvent } from "@mui/material";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import GenericSelectField from "../GenericSelectField";
import { FormNestedSelectElement, FormSelectElement } from "../types";

interface Props extends PropsWithChildren {
  element: FormNestedSelectElement;
  control: Control<FieldValues, any>;
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  nestedFieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

/**
 * GenericNestedSelectField component
 *
 * This component solves a specific use case where we have one select field acting as a main one
 * and depending on the selected value in the main select, we render different options in the
 * nested select.
 * Example of this use case is Country and State selection.
 *
 * If there are no option available for the selected main select, we don't render nested select.
 */
const GenericNestedSelectField: FC<Props> = ({ element, control, fieldError, nestedFieldError }) => {
  const [nestedOptions, setNestedOptions] = useState<
    | {
        label: string;
        value: string;
      }[]
  >([]);

  const mainEl: FormSelectElement = useMemo(
    () => ({
      type: "select",
      label: element.label,
      required: element.required,
      options: element.options,
      name: element.name,
    }),
    [element.label, element.name, element.options, element.required],
  );

  const nestedEl: FormSelectElement = useMemo(
    () => ({
      type: "select",
      label: element.nestedLabel,
      required: element.nestedRequired,
      options: nestedOptions,
      name: element.nestedName,
    }),
    [element.nestedLabel, element.nestedName, element.nestedRequired, nestedOptions],
  );

  const handleMainElementOnChange = useCallback(
    (e: SelectChangeEvent) => {
      // Nested options depend on the selected option in the main select, so we must get current value
      const selectedOption = element.options.find((p) => p.value === e.target.value);
      setNestedOptions(selectedOption?.subOptions || []);
    },
    [element.options],
  );

  return (
    <>
      <GenericSelectField
        element={mainEl}
        control={control}
        fieldError={fieldError}
        onChange={handleMainElementOnChange}
      />
      {nestedOptions.length ? (
        <GenericSelectField element={nestedEl} control={control} fieldError={nestedFieldError} />
      ) : null}
    </>
  );
};

export default GenericNestedSelectField;
