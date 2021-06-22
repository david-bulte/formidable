import { Injectable } from '@angular/core';
import { guid, ID } from '@datorama/akita';
import { ControlItem, FormidableItem } from '@formidable/shared/builder';
import { FormidableItemStore } from './formidable-item-store.service';

@Injectable({ providedIn: 'root' })
export class FormidableItemService {
  constructor(private store: FormidableItemStore) {}

  add(item: FormidableItem) {
    // todo move factory methods to PaletteItem
    const controlItem: ControlItem = {
      id: guid(),
      props: { label: null, name: null },
      validation: {required: false},
      type: item.type,
      parentId: item.parentId,
    };

    this.store.add(controlItem);
    this.store.setActive(controlItem.id);
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }

  update(id: ID, item: FormidableItem) {
    this.store.update(id, { props: item.props, validation: item.validation });
  }
}
