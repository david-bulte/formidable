import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig, } from '@datorama/akita';
import { FormidableItem } from '@formidable/shared/renderer';

export interface FormidableItemState
  extends EntityState<FormidableItem>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formidable-item' })
export class FormidableItemStore extends EntityStore<FormidableItemState> {
  constructor() {
    super();
  }
}
