import { ID } from '@datorama/akita';

export interface PaletteItem {
  id?: ID;
  type: FormElementType;
  group?: PaletteGroup;
  props: {
    icon?: string;
    label?: string;
    info?: string;
  };
  requiredProps: string[];
  propsForm?: FormElement;
}

export enum PaletteGroup {
  BASIC = 'basic',
  LAYOUT = 'layout',
}

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

export interface FormElement {
  id?: ID;
  type: FormElementType;
  props: {
    label?: string;
    name?: string;
    classes?: string;
    rows?: number;
    defaultValue?: any;
    // todo
    autosubmit?: boolean;
    tooltip?: string;
    mode?: 'radio' | 'dropdown';
    options?: { value: string; label: string }[];
    // required?: boolean;
  };
  validation?: {
    required?: boolean | undefined;
    min?: number;
    max?: number;
    custom?: string;
  };
  visibility?: {
    custom?: string;
  };
  parentId?: ID;
  children?: FormElement[];
}
