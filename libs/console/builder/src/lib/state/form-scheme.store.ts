import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, guid, Store, StoreConfig } from '@datorama/akita';
import { FormConfig, FormidableItem, FormItem, Type } from '@formidable/shared/builder';
import { PaletteItem2 } from './palettte-item.model';

// todo domain lib

export interface FormSchemeState extends EntityState<FormidableItem>, ActiveState {
  formConfig?: FormConfig;
  root: FormItem;
}

// export function createInitialState(): FormSchemeState {
  // return {
  //   // todo create this when creating a new form (w/label)
  //   root: { id: guid(), type: Type.FORM, props: {}, children: [] },
  // };
// }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'form-scheme' })
export class FormSchemeStore extends EntityStore<FormSchemeState> {
  constructor() {
    super({root: { id: guid(), type: Type.FORM, props: {}, children: [] }});
  }
}
