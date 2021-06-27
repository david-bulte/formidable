import { Injectable } from '@angular/core';
import { guid, ID } from '@datorama/akita';
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
    const controlItem: ControlItem = {
      id: guid(),
      props: { label: null, name: null, classes: null },
      validation: {
        required: false,
        custom:
          '{"conditions":{"all":[{"fact":"age","operator":"equal","value":"10"}]},"event":{"type":"message","params":{"data":"green"}}}',
      },
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
    this.store.update(id, { props: item.props, validation: item.validation || {} });
  }
}
