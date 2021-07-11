import { Injectable } from '@angular/core';
import { applyTransaction, guid, ID } from '@datorama/akita';
import { FormElement, FormElementType } from '@formidable/shared/renderer';
import { FormElementQuery } from './form-element-query.service';
import { FormElementStore } from './form-element-store.service';

@Injectable({ providedIn: 'root' })
export class FormElementService {
  constructor(
    private store: FormElementStore,
    private query: FormElementQuery
  ) {}

  createForm() {
    this.add({
      type: FormElementType.FORM,
      props: {},
      validation: { required: false, custom: null },
      parentId: null,
    });
  }

  add(item: FormElement) {
    const id = guid();
    applyTransaction(() => {
      this.store.add({ id, type: item.type, props: {}, parentId: item.parentId });
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

  update(id: ID, item: FormElement) {
    applyTransaction(() => {
      this.store.update(id, item);
      this.store.setActive(id);
    });
  }
}
