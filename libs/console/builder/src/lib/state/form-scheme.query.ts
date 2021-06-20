import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { combineQueries, ID, QueryEntity } from '@datorama/akita';
import { FormidableItem, FormItem, isLayoutItem } from '@formidable/shared/builder';
import { map, switchMap } from 'rxjs/operators';
import { FormSchemeState, FormSchemeStore } from './form-scheme.store';

@Injectable({ providedIn: 'root' })
export class FormSchemeQuery extends QueryEntity<FormSchemeState> {

  rootChildren$ = this.select('root').pipe(
    switchMap((id) => this.selectEntity(id))
  );

  root$ = this.selectAll({
    filterBy: (item: FormidableItem) => item.parentId === null,
  }).pipe(map((result) => result?.[0] ?? null));

  getAllAsTree(): FormItem {
    const root: FormItem = this.getAll().find(item => item.parentId === null) as FormItem;
    return {...root, children: this.getChildren(root.id)}
  }

  private getChildren(parentId: ID) {
    return this.getAll().filter(item => item.parentId === parentId).map(item => {
      if (isLayoutItem(item)) {
        return {...item, children: this.getChildren(item.id)}
      } else {
        return item;
      }
    });
  }

  all$ = combineQueries([
    this.select('root'),
    this.selectAll({ asObject: true }),
  ]).pipe(
    map(([root, formItems]) => {
      // todo recursive + root should not contain full FormItems
      return root.children.map(({ id }) => formItems[id]);
    })
  );

  constructor(protected store: FormSchemeStore) {
    super(store);
  }
}
