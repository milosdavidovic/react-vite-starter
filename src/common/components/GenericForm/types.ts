export type FormElementType = "date" | "string" | "number" | "select" | "nested-select" | "multiselect" | "phone";

type Option<T = string> = { label: string; value: T };

interface FormElementBase {
  name: string;
  label: string;
  type: FormElementType;
  required: boolean;

  width?: string;
}

export interface FormDateElement extends FormElementBase {
  type: "date";
}

export interface FormSelectElement extends FormElementBase {
  type: "select";
  options: Array<Option>;
}

export interface FormTextElement extends FormElementBase {
  type: "string";
  inputMaxLength?: number;
  maxLength?: number;
  minLength?: number;
  valueRegex?: RegExp;
}

export interface FormMultiSelectElement extends FormElementBase {
  type: "multiselect";
  options: Array<Option>;
}

export interface FormPhoneElement extends FormElementBase {
  type: "phone";
  options: Array<Option & { flag: string }>;
}

export interface FormNestedSelectElement extends FormElementBase {
  type: "nested-select";
  nestedName: string;
  nestedLabel: string;
  nestedRequired: boolean;
  options: Array<{ label: string; value: string; subOptions: Array<Option> }>;
}

export type FormElement =
  | FormDateElement
  | FormSelectElement
  | FormTextElement
  | FormNestedSelectElement
  | FormMultiSelectElement;
