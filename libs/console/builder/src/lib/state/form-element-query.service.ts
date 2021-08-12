import { Injectable } from '@angular/core';
import { ID, QueryEntity } from '@datorama/akita';
import { FormElement, FormElementType } from '@formidable/shared/renderer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ProjectQuery } from './project-query.service';
import {
  FormElementState,
  FormElementStore,
} from './form-element-store.service';
import { paletteItems } from './palette-items';

@Injectable({ providedIn: 'root' })
export class FormElementQuery extends QueryEntity<FormElementState> {
  // root$ = this.selectAll({
  //   filterBy: (element: FormElement) => element.parentId === null,
  // }).pipe(map((result) => result?.[0] ?? null));

  root$ = this.projectQuery
    .selectActiveId()
    .pipe(switchMap((activeId) => this.selectEntity(activeId)));

  invalid$ = this.selectAll().pipe(
    map((elements) => {
      return elements.some((element) => {
        const paletteItem = paletteItems.find(
          (paletteItem) => element.type === paletteItem.type
        );
        return paletteItem.requiredProps.some(
          (requiredProp) => !element.props[requiredProp]
        );
      });
    })
  );

  constructor(
    protected store: FormElementStore,
    private projectQuery: ProjectQuery
  ) {
    super(store);
  }

  getComposition(): FormElement {
    const root = this.getEntity(this.projectQuery.getActiveId());
    return { ...root, children: this.getChildren(root.id) };
    // const root: FormElement = this.getAll().find(
    //   (element) => element.parentId === null
    // );
    // return { ...root, children: this.getChildren(root.id) };
  }

  selectProject(): Observable<FormElement> {
    return this.projectQuery.selectActiveId().pipe(
      switchMap((activeId) => this.selectEntity(activeId)),
      map((root) =>
        root ? { ...root, children: this.getChildren(root.id) } : { ...root, children: []}
      )
    );
    // return this.selectAll().pipe(
    //   map((all) => {
    //     const root: FormElement = all.find(
    //       (element) => element.parentId === null
    //     );
    //     return { ...root, children: this.getChildren(root.id) };
    //   })
    // );
  }

  selectActiveFormDescription(): Observable<FormElement> {
    return this.selectActive(({ type }) => type).pipe(
      distinctUntilChanged(),
      map((type) => {
        const paletteItem = paletteItems.find((item) => item.type === type);
        return paletteItem.propsForm;
      })
    );
  }

  private getChildren(parentId: ID): FormElement[] {
    return this.getAll()
      .filter((element) => element.parentId === parentId)
      .map((element) => {
        // todo
        if (
          [
            FormElementType.ROW,
            FormElementType.COL,
            FormElementType.GROUP,
          ].indexOf(element.type) > -1
        ) {
          return { ...element, children: this.getChildren(element.id) };
        } else {
          return element;
        }
      });
  }
}
