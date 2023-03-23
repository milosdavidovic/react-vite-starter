/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { PropsWithChildren } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormElement } from "./types";
import GenericDateField from "./GenericDateField";
import GenericTextField from "./GenericTextField";
import GenericSelectField from "./GenericSelectField";
import GenericMultiSelectField from "./GenericMultiSelectField";
import GenericNestedSelectField from "./GenericNestedSelectField";

interface Props<T> extends PropsWithChildren {
  formDefinition: Array<FormElement | Array<FormElement>>;
  defaultValues?: T;
  onNext: (values: T) => void;
  submitText: string;
  isSubmitDisabled?: boolean;
  title?: string;
}

/**
 * The "GenericForm" component is a reusable form component.
 * It takes in a form configuration object as a prop, which defines the structure and elements of the form.
 * Based on this configuration, the component will dynamically render form inputs such as text fields, select boxes, and date pickers.
 * Additionally, the component will accept the return value from the "useForm" hook (from react hook form), allowing the parent component to manage the form's state.
 * This allows for easy customization and integration with other form-related logic in the parent component.
 *
 * Note: defaultValues prop is not actually used inside the hook atm, but it's purpose is to infer form data type,
 * so it is known to parent when onNext callback is executed. There is a space for improvement here and ideally it will
 * be removed.
 */
const GenericForm = <T extends unknown>({ formDefinition, onNext, submitText, isSubmitDisabled, title }: Props<T>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const renderElement = (el: FormElement | Array<FormElement>): React.ReactNode => {
    if (Array.isArray(el))
      return (
        <Stack key={el.map((e) => e.name).join("-")} sx={{ flexDirection: "row", gap: 1 }}>
          {el.map((nestedEl) => renderElement(nestedEl))}
        </Stack>
      );
    if (el.type === "string")
      return <GenericTextField key={el.label} element={el} register={register} fieldError={errors[el.name]} />;
    if (el.type === "select") {
      return <GenericSelectField key={el.label} element={el} control={control} fieldError={errors[el.name]} />;
    }
    if (el.type === "date")
      return <GenericDateField key={el.label} element={el} control={control} fieldError={errors[el.name]} />;

    if (el.type === "multiselect")
      return <GenericMultiSelectField key={el.label} element={el} control={control} fieldError={errors[el.name]} />;

    if (el.type === "nested-select")
      return (
        <GenericNestedSelectField
          key={el.label}
          element={el}
          control={control}
          fieldError={errors[el.name]}
          nestedFieldError={errors[el.nestedName]}
        />
      );
    return "ELEMENT TYPE UNKNOWN";
  };

  const onSubmit: SubmitHandler<any> = onNext;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {title ? <Typography variant="h6">{title}</Typography> : null}
      {formDefinition.map(renderElement)}
      <Button size="large" variant="contained" type="submit" disabled={isSubmitDisabled}>
        {submitText}
      </Button>
    </Box>
  );
};

export default GenericForm;
