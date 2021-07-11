import { FormElement, FormElementType } from '@formidable/shared/renderer';

type DefaultProps = { [key: string]: any };

export function form(
  children: FormElement[],
  defaultProps: DefaultProps = {}
): FormElement {
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
  defaultProps: DefaultProps = {}
): FormElement {
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
  labelName,
  required = false,
  defaultProps: DefaultProps = {}
): FormElement {
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
  labelName,
  mode: 'dropdown' | 'radio',
  options: { value: any; label: string }[] = [],
  required = false,
  defaultProps: DefaultProps = {}
): FormElement {
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
  labelName,
  required = false,
  defaultProps: DefaultProps = {}
): FormElement {
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
  labelName,
  required = false,
  defaultProps: DefaultProps = {}
): FormElement {
  return {
    type: FormElementType.CHECKBOX,
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

export function textarea(
  labelName,
  required = false,
  defaultProps: DefaultProps = {}
): FormElement {
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
  labelName,
  children: FormElement[],
  defaultProps: DefaultProps = {}
): FormElement {
  return {
    type: FormElementType.REPEAT,
    props: {
      name: labelName,
      label: labelName,
      ...defaultProps,
    },
    children,
  };
}
