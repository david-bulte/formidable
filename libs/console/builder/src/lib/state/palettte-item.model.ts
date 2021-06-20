import { guid, ID } from '@datorama/akita';
import { ControlType } from '../../../../../shared/builder/src/lib/model';

export interface PaletteItem2 {
  id: number | string;
  type: string;
  label: string;
  icon?: string;
}

// export interface FormItem {
//   id?: ID;
//   type: FormItemType;
//   properties: {
//     name: string;
//     label?: string;
//     classes?: string;
//   };
//   children: FormItem[]
// }



export function createPaletteItem(params: Partial<PaletteItem2>) {
  return {...params, id: guid()} as PaletteItem2;

}
