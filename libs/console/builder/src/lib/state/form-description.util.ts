import { FormidableItem, Type } from '@formidable/shared/renderer';

type DefaultProps = { [key: string]: any };

export function form(
  children: FormidableItem[],
  defaultProps: DefaultProps = {}
): FormidableItem {
  return {
    type: Type.FORM,
    props: {
      autosubmit: true,
      ...defaultProps,
    },
    children,
  };
}

export function group(
  name: string,
  children: FormidableItem[],
  defaultProps: DefaultProps = {}
): FormidableItem {
  return {
    type: Type.GROUP,
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
): FormidableItem {
  return {
    type: Type.INPUT,
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
): FormidableItem {
  return {
    type: Type.SELECT,
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
): FormidableItem {
  return {
    type: Type.NUMBER,
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
): FormidableItem {
  return {
    type: Type.CHECKBOX,
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
): FormidableItem {
  return {
    type: Type.TEXTAREA,
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
  children: FormidableItem[],
  defaultProps: DefaultProps = {}
): FormidableItem {
  return {
    type: Type.REPEAT,
    props: {
      name: labelName,
      label: labelName,
      ...defaultProps,
    },
    children,
  };
}
