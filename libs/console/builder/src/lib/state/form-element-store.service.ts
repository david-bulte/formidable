import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig, } from '@datorama/akita';
import { FormElement } from '@formidable/shared/renderer';

export interface FormElementState
  extends EntityState<FormElement>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'form-element' })
export class FormElementStore extends EntityStore<FormElementState> {
  constructor() {
    super();
  }
}
