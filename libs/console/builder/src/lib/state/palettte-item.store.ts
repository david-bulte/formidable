import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PaletteItem2 } from './palettte-item.model';

export interface PalettteItemState extends EntityState<PaletteItem2>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'palettte-item' })
export class PalettteItemStore extends EntityStore<PalettteItemState> {

  constructor() {
    super();
  }

}
