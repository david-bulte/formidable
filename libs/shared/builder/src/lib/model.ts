import { ID } from '@datorama/akita';

export class PaletteItem {
  id?: ID;
  type: Type;
  props: {
    icon?: string;
    label?: string;
    info?: string;
  };
  propDescriptors?: PropDescriptor[];
}

export enum Type {
  FORM = 'form',
  INPUT = 'input',
  NUMBER = 'number',
  ROW = 'row',
  COL = 'col',
}

export interface PropDescriptor {}

export class FormidableItem {
  id?: ID;
  type: Type;
  props: {
    label?: string;
    name?: string;
    classes?: string;
  };
  validation: {
    required: boolean | undefined;
    custom: string;
  };
  parentId?: ID;
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

// export interface FormConfig {
//   properties: {
//     name?: string;
//   };
//   children: ControlConfig[];
// }
//
// export interface ControlConfig {
//   id?: string;
//   type: ControlType;
//   properties: {
//     name: string;
//     label?: string;
//     classes?: string;
//   };
//   children: ControlConfig[];
// }
//
// export enum ControlType {
//   INPUT="input",
//   ROW= "row",
//   COL="col",
// }
