import { Injectable } from '@angular/core';
import { ID, QueryEntity } from '@datorama/akita';
import { FormElement, FormElementType } from '@formidable/shared/renderer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormElementState, FormElementStore } from './form-element-store.service';
import { paletteItems } from './palette-items';

@Injectable({ providedIn: 'root' })
export class FormElementQuery extends QueryEntity<FormElementState> {
  rootChildren$ = this.select('root').pipe(
    switchMap((id) => this.selectEntity(id))
  );

  root$ = this.selectAll({
    filterBy: (item: FormElement) => item.parentId === null,
  }).pipe(map((result) => result?.[0] ?? null));

  invalid$ = this.selectAll().pipe(
    map((elements) => {
      return elements.some((item) => {
        const paletteItem = paletteItems.find(
          (paletteItem) => item.type === paletteItem.type
        );
        return paletteItem.requiredProps.some(
          (requiredProp) => !item.props[requiredProp]
        );
      });
    })
  );

  constructor(protected store: FormElementStore) {
    super(store);
  }

  getComposition(): FormElement {
    const root: FormElement = this.getAll().find(
      (item) => item.parentId === null
    );
    return { ...root, children: this.getChildren(root.id) };
  }

  selectComposition(): Observable<FormElement> {
    return this.selectAll().pipe(
      map((all) => {
        const root: FormElement = all.find(
          (item) => item.parentId === null
        );
        return { ...root, children: this.getChildren(root.id) };
      })
    );
  }

  selectActiveFormDescription(): Observable<FormElement> {
    return this.selectActive(({ type }) => type).pipe(
      distinctUntilChanged(),
      map((type) => {
        const paletteItem = paletteItems.find((item) => item.type === type);
        return paletteItem.formComposition;
      })
    );
  }

  private getChildren(parentId: ID) {
    return this.getAll()
      .filter((item) => item.parentId === parentId)
      .map((item) => {
        // todo
        if ([FormElementType.ROW, FormElementType.COL, FormElementType.GROUP].indexOf(item.type) > -1) {
          return { ...item, children: this.getChildren(item.id) };
        } else {
          return item;
        }
      });
  }
}
