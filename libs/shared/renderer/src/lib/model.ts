import { ID } from '@datorama/akita';

export class PaletteItem {
  id?: ID;
  type: Type;
  props: {
    icon?: string;
    label?: string;
    info?: string;
  };
  propDescriptors?: FormidableItem[];
}

export enum Type {
  CHECKBOX = 'checkbox',
  COL = 'col',
  FORM = 'form',
  GROUP = 'group',
  INPUT = 'input',
  NUMBER = 'number',
  ROW = 'row',
  TEXTAREA = 'textarea',
}

export class FormidableItem {
  id?: ID;
  type: Type;
  props: {
    label?: string;
    name?: string;
    classes?: string;
    rows?: number;
  };
  validation?: {
    required?: boolean | undefined;
    custom?: string;
  };
  parentId?: ID;
  children?: FormidableItem[];
}

export class FormItem extends FormidableItem {
  children: FormidableItem[];
}

export class LayoutItem extends FormidableItem {
  children: FormidableItem[];
}

export function isLayoutItem(value: FormidableItem): value is LayoutItem {
  return new Set([Type.ROW, Type.COL]).has(value.type);
}

export function isFormItem(value: FormidableItem): value is LayoutItem {
  return value.type === Type.FORM;
}

export class ControlItem extends FormidableItem {}
