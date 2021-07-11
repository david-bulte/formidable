import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { ID, QueryEntity } from '@datorama/akita';
import { FormidableItem, FormItem, Type } from '@formidable/shared/renderer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import {
  FormidableItemState,
  FormidableItemStore,
} from './formidable-item-store.service';
import { paletteItems } from './palette-items';

@Injectable({ providedIn: 'root' })
export class FormidableItemQuery extends QueryEntity<FormidableItemState> {
  rootChildren$ = this.select('root').pipe(
    switchMap((id) => this.selectEntity(id))
  );

  root$ = this.selectAll({
    filterBy: (item: FormidableItem) => item.parentId === null,
  }).pipe(map((result) => result?.[0] ?? null));

  invalid$ = this.selectAll().pipe(
    map((formidableItems) => {
      return formidableItems.some((item) => {
        const paletteItem = paletteItems.find(
          (paletteItem) => item.type === paletteItem.type
        );
        return paletteItem.requiredProps.some(
          (requiredProp) => !item.props[requiredProp]
        );
      });
    })
  );

  constructor(protected store: FormidableItemStore) {
    super(store);
  }

  getAllAsTree(): FormItem {
    const root: FormItem = this.getAll().find(
      (item) => item.parentId === null
    ) as FormItem;
    return { ...root, children: this.getChildren(root.id) };
  }

  selectAllAsTree(): Observable<FormItem> {
    return this.selectAll().pipe(map(all => {
      const root: FormItem = all.find(
        (item) => item.parentId === null
      ) as FormItem;
      return { ...root, children: this.getChildren(root.id) };
    }));
  }

  selectActiveFormDescription(): Observable<FormidableItem> {
    return this.selectActive(({ type }) => type).pipe(
      distinctUntilChanged(),
      map((type) => {
        const paletteItem = paletteItems.find((item) => item.type === type);
        return paletteItem.formDescription;
      })
    );
  }

  private getChildren(parentId: ID) {
    return this.getAll()
      .filter((item) => item.parentId === parentId)
      .map((item) => {
        // todo
        if ([Type.ROW, Type.COL, Type.GROUP].indexOf(item.type) > -1) {
          return { ...item, children: this.getChildren(item.id) };
        } else {
          return item;
        }
      });
  }
}
