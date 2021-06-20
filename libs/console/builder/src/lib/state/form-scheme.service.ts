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

    // // todo separate hierarchical from details?
    // this.formSchemeStore.update(({ root }) => ({
    //   root: { ...root, children: arrayAdd(root.children, controlItem) }
    // }));
  }

  setActive(id: ID) {
    this.formSchemeStore.setActive(id);
  }

  update(id: ID, props: any) {
    this.formSchemeStore.update(id, { props });
  }

  // todo types
  updateScheme($event: any) {
    // todo save
    this.formSchemeStore.update((state) => ({
      formConfig: {
        children: $event,
        properties: {},
      },
    }));
  }

  selectPaletteItem(id: any) {
    // this.formSchemeStore.update((state) => {
    //   const children = [...state.formConfig.children];
    //   children.find(child => child.id === id).selected = true
    // });
  }
}
