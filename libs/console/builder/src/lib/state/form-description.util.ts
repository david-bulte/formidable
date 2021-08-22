import {
  CheckboxFormElement,
  FormFormElement,
  FormElement,
  FormElementType,
  GroupFormElement,
  InputFormElement,
  NumberFormElement,
  RepeatFormElement,
  SelectFormElement,
  TextareaFormElement,
} from '@formidable/shared/renderer';

export function form(
  children: FormElement[],
  defaultProps?: Partial<Record<keyof FormFormElement['props'], any>>
): FormFormElement {
  return {
    type: FormElementType.FORM,
    props: {
      autosubmit: true,
      ...defaultProps,
    },
    children,
  };
}

export function group(
  name: string,
  children: FormElement[],
  defaultProps?: Partial<Record<keyof GroupFormElement['props'], any>>
): GroupFormElement {
  return {
    type: FormElementType.GROUP,
    props: {
      name,
      ...defaultProps,
    },
    children,
  };
}

export function input(
  labelName: string,
  required = false,
  defaultProps?: Partial<Record<keyof InputFormElement['props'], any>>
): InputFormElement {
  return {
    type: FormElementType.INPUT,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

export function select(
  labelName: string,
  mode: 'dropdown' | 'radio',
  options: { value: any; label: string }[] = [],
  required = false,
  defaultProps?: Partial<Record<keyof SelectFormElement['props'], any>>
): SelectFormElement {
  return {
    type: FormElementType.SELECT,
    props: {
      label: labelName,
      name: labelName,
      mode,
      options,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

export function number(
  labelName: string,
  required = false,
  defaultProps?: Partial<Record<keyof NumberFormElement['props'], any>>
): NumberFormElement {
  return {
    type: FormElementType.NUMBER,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

export function checkbox(
  labelName: string,
  defaultProps?: Partial<Record<keyof CheckboxFormElement['props'], any>>
): CheckboxFormElement {
  return {
    type: FormElementType.CHECKBOX,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
  };
}

export function textarea(
  labelName: string,
  required = false,
  defaultProps?: Partial<Record<keyof TextareaFormElement['props'], any>>
): TextareaFormElement {
  return {
    type: FormElementType.TEXTAREA,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

export function repeat(
  labelName: string,
  children: FormElement[],
  defaultProps?: Partial<Record<keyof RepeatFormElement['props'], any>>
): RepeatFormElement {
  return {
    type: FormElementType.REPEAT,
    props: {
      name: labelName,
      ...defaultProps,
    },
    children,
  };
}
