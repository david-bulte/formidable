import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { createPaletteItem, PaletteItem2 } from './palettte-item.model';
import { PalettteItemStore } from './palettte-item.store';

@Injectable({ providedIn: 'root' })
export class PaletteItemService {
  constructor(private palettteItemStore: PalettteItemStore) {}

  insert(item: PaletteItem2, targetIndex: number) {
    let paletteItem = createPaletteItem(item);
    this.palettteItemStore.add(paletteItem);
    this.palettteItemStore.setActive(paletteItem.id);
  }

  setActive(paletteItemId: ID) {
    this.palettteItemStore.setActive(paletteItemId);
  }

  get() {
    // return this.http.get<PaletteItem[]>('https://api.com').pipe(
    //   tap((entities) => {
    //     this.palettteItemStore.set(entities);
    //   })
    // );
  }

  add(palettteItem: PaletteItem2) {
    this.palettteItemStore.add(palettteItem);
  }

  update(id, palettteItem: Partial<PaletteItem2>) {
    this.palettteItemStore.update(id, palettteItem);
  }

  remove(id: ID) {
    this.palettteItemStore.remove(id);
  }
}
