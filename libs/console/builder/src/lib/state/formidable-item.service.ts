import { Injectable } from '@angular/core';
import { applyTransaction, guid, ID } from '@datorama/akita';
import { FormidableItem, Type } from '@formidable/shared/renderer';
import { FormidableItemQuery } from './formidable-item-query.service';
import { FormidableItemStore } from './formidable-item-store.service';

@Injectable({ providedIn: 'root' })
export class FormidableItemService {
  constructor(
    private store: FormidableItemStore,
    private query: FormidableItemQuery
  ) {}

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

  remove(id: ID) {
    applyTransaction(() => {
      this.store.remove(id);
      this.query
        .getAll({ filterBy: (item) => item.parentId === id })
        .forEach((child) => {
          this.remove(child.id);
        });
      if (!this.query.getActiveId()) {
        const root = this.query.getAll().find((item) => !item.parentId);
        this.store.setActive(root.id);
      }
    });
  }

  update(id: ID, item: FormidableItem) {
    applyTransaction(() => {
      this.store.update(id, item);
      this.store.setActive(id);
    });
  }
}
