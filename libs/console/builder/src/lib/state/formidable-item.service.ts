import { Injectable } from '@angular/core';
import { applyTransaction, guid, ID } from '@datorama/akita';
import { ControlItem, FormidableItem, Type } from '@formidable/shared/renderer';
import { FormidableItemStore } from './formidable-item-store.service';

@Injectable({ providedIn: 'root' })
export class FormidableItemService {
  constructor(private store: FormidableItemStore) {}

  createForm() {
    this.add({
      type: Type.FORM,
      props: {},
      validation: { required: false, custom: null },
      parentId: null,
    });
  }

  add(item: FormidableItem) {
    const id = guid();
    applyTransaction(() => {
      this.store.add({ ...item, id });
      this.store.setActive(id);
    });
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }

  update(id: ID, item: FormidableItem) {
    this.store.update(id, {
      props: item.props,
      validation: item.validation || {},
    });
  }
}
