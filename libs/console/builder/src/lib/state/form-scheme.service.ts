import { Injectable } from '@angular/core';
import { guid, ID } from '@datorama/akita';
import { ControlItem, FormidableItem } from '@formidable/shared/builder';
import { FormSchemeStore } from './form-scheme.store';

@Injectable({ providedIn: 'root' })
export class FormSchemeService {
  constructor(private formSchemeStore: FormSchemeStore) {}

  add(item: FormidableItem) {
    // todo move factory methods to PaletteItem
    const controlItem: ControlItem = {
      id: guid(),
      props: { label: null },
      type: item.type,
      parentId: item.parentId
    };

    this.formSchemeStore.add(controlItem);
    this.formSchemeStore.setActive(controlItem.id);
  }

  setActive(id: ID) {
    this.formSchemeStore.setActive(id);
  }

  update(id: ID, props: any) {
    this.formSchemeStore.update(id, { props });
  }

}
