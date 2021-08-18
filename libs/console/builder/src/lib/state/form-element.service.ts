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

  createForm(name: string, id?: ID) {
    const formElement = {
      id,
      type: FormElementType.FORM,
      props: { name },
      validation: { required: false, custom: null },
      parentId: null,
    };
    return this.add(formElement);
  }

  add(formElement: FormElement) {
    applyTransaction(() => {
      formElement = {
        id: formElement.id || guid(),
        type: formElement.type,
        props: {},
        parentId: formElement.parentId,
      };
      this.store.add(formElement);
      this.store.setActive(formElement.id);
    });
    return formElement;
  }

  setActive(id: ID | null) {
    this.store.setActive(id);
  }

  remove(id: ID) {
    applyTransaction(() => {
      this.store.remove(id);
      this.query
        .getAll({ filterBy: (element) => element.parentId === id })
        .forEach((child) => {
          this.remove(child.id);
        });
      if (!this.query.getActiveId()) {
        const root = this.query.getAll().find((element) => !element.parentId);
        this.store.setActive(root.id);
      }
    });
  }

  update(id: ID, formElement: FormElement) {
    applyTransaction(() => {
      this.store.update(id, formElement);
      this.store.setActive(id);
    });
  }
}
