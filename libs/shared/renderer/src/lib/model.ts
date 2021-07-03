import { ID } from '@datorama/akita';

export class PaletteItem {
  id?: ID;
  type: Type;
  props: {
    icon?: string;
    label?: string;
    info?: string;
  };
  requiredProps: string[];
  propDescriptors?: FormidableItem[];
}

export enum Type {
  CHECKBOX = 'checkbox',
  COL = 'col',
  FORM = 'form',
  GROUP = 'group',
  INPUT = 'input',
  LABEL = 'label',
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
    defaultValue?: any;
    // todo
    autosubmit?: boolean;
    tooltip?: string;
    // required?: boolean;
  };
  validation?: {
    required?: boolean | undefined;
    min?: number;
    max?: number;
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

export class ControlItem extends FormidableItem {}
