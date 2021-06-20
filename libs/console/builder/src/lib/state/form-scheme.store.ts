import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig, } from '@datorama/akita';
import { FormidableItem } from '@formidable/shared/builder';

export interface FormSchemeState
    extends EntityState<FormidableItem>, ActiveState {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'form-scheme'})
export class FormSchemeStore extends EntityStore<FormSchemeState> {
    constructor() {
        super();
    }
}
