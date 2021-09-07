import { ID } from '@datorama/akita';

export enum FormElementType {
  CHECKBOX = 'checkbox',
  COL = 'col',
  FORM = 'form',
  GROUP = 'group',
  REPEAT = 'repeat',
  INPUT = 'input',
  LABEL = 'label',
  SELECT = 'select',
  NUMBER = 'number',
  ROW = 'row',
  TEXTAREA = 'textarea',
}

// DESCRIPTOR

export interface FormElementDescriptor {
  // todo ?
  id?: ID;
  type: FormElementType;
  // todo name?
  group?: PaletteGroup;
  label?: string;
  icon?: string;
  info?: string;
  // todo name?
  propsForm?: FormElement;
  // todo?
  requiredProps: string[];
}

export enum PaletteGroup {
  BASIC = 'basic',
  LAYOUT = 'layout',
}

// CONCEPT

export interface FormElement {
  id?: ID;
  type: FormElementType;
  props: { [key: string]: any };
  parentId?: ID;
  projectId?: ID;
}

export interface StoredFormElement extends FormElement {
  id: ID;
}

export interface FormFormElement extends FormElement {
  type: FormElementType.FORM;
  props: {
    classes?: string;
    autosubmit: boolean;
  };
  children?: FormElement[];
}

export interface RowFormElement extends FormElement {
  type: FormElementType.ROW;
  props: {
    classes?: string;
    direction: 'row';
  };
  children?: FormElement[];
}

export interface ColFormElement extends FormElement {
  type: FormElementType.COL;
  props: {
    classes?: string;
    direction: 'col';
  };
  children?: FormElement[];
}

export interface GroupFormElement extends FormElement {
  type: FormElementType.GROUP;
  props: {
    name: string;
    label?: string;
    classes?: string;
  };
  validation?: {
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
  children?: FormElement[];
}

export function isGroup(obj: any): obj is GroupFormElement {
  return obj.type === FormElementType.GROUP;
}

export interface RepeatFormElement extends FormElement {
  type: FormElementType.REPEAT;
  props: {
    name: string;
  };
  children: FormElement[];
}

export function isRepeat(obj: any): obj is RepeatFormElement {
  return obj.type === FormElementType.REPEAT;
}

export interface InputFormElement extends FormElement {
  type: FormElementType.INPUT;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    defaultValue?: string;
  };
  validation?: {
    required?: boolean;
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
}

export interface TextareaFormElement extends FormElement {
  type: FormElementType.TEXTAREA;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    defaultValue?: string;
  };
  validation?: {
    required?: boolean;
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
}

export interface NumberFormElement extends FormElement {
  type: FormElementType.NUMBER;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    defaultValue?: number;
  };
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
}

export interface LabelFormElement extends FormElement {
  type: FormElementType.LABEL;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    required?: boolean;
  };
  visibility?: {
    custom?: string;
  };
}

export interface CheckboxFormElement extends FormElement {
  type: FormElementType.CHECKBOX;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    defaultValue?: boolean;
  };
  visibility?: {
    custom?: string;
  };
}

export interface SelectFormElement extends FormElement {
  type: FormElementType.SELECT;
  props: {
    name: string;
    label?: string;
    classes?: string;
    tooltip?: string;
    mode: 'radio' | 'dropdown';
    defaultValue?: boolean;
    options: { label: string; value: string }[];
  };
  validation?: {
    required?: boolean;
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
}

export interface Parent extends FormElement {
  children?: FormElement[];
}

export function isParent(obj: any): obj is Parent {
  return obj['children'];
}

export interface Validatable extends FormElement {
  validation?: any;
}

export function isValidatable(obj: any): obj is Validatable {
  return obj['validation'];
}
