import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PalettteItemStore, PalettteItemState } from './palettte-item.store';

@Injectable({ providedIn: 'root' })
export class PalettteItemQuery extends QueryEntity<PalettteItemState> {

  constructor(protected store: PalettteItemStore) {
    super(store);
  }

}
