import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig, } from '@datorama/akita';
import { FormidableItem } from '@formidable/shared/builder';

export interface FormidableItemScheme
    extends EntityState<FormidableItem>, ActiveState {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'formidable-item'})
export class FormidableItemStore extends EntityStore<FormidableItemScheme> {
    constructor() {
        super();
    }
}
