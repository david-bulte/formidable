import { Injectable } from '@angular/core';
import { combineQueries, ID, QueryEntity } from '@datorama/akita';
import {
  FormElement,
  FormFormElement,
  isParent,
} from '@formidable/shared/renderer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { DEFAULT_FORM_ELEMENT_DESCRIPTORS } from './form-element-descriptors';
import {
  FormElementState,
  FormElementStore,
} from './form-element-store.service';
import { ProjectQuery } from './project-query.service';

@Injectable({ providedIn: 'root' })
export class FormElementQuery extends QueryEntity<FormElementState> {
  rootFormElementBuilderView$ = this.projectQuery
    .selectActiveId()
    .pipe(switchMap((activeId) => this.selectEntity(activeId)));

  invalid$ = combineQueries([
    this.selectAll(),
    this.projectQuery.selectActiveId(),
  ]).pipe(
    map(([formElements, projectId]) => {
      return formElements
        .filter((fe) => fe.projectId === projectId)
        .some((fe) => {
          const formElementDescriptor = DEFAULT_FORM_ELEMENT_DESCRIPTORS.find(
            (paletteItem) => fe.type === paletteItem.type
          );
          // todo requiredProps?
          return formElementDescriptor?.requiredProps.some(
            (requiredProp) => !fe.props[requiredProp]
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

  getRootFormElementPreviewView(): FormFormElement | undefined {
    const root = this.getEntity(this.projectQuery.getActiveId());
    return root
      ? { ...(root as FormFormElement), children: this.getChildren(root.id) }
      : undefined;
  }

  selectProject(): Observable<FormElement | undefined> {
    return this.projectQuery.selectActiveId().pipe(
      switchMap((activeId) => this.selectEntity(activeId)),
      map((root) =>
        root ? { ...root, children: this.getChildren(root.id) } : undefined
      )
    );
  }

  selectActiveFormDescription(): Observable<FormElement | null | undefined> {
    return this.selectActive().pipe(
      map((formElement) => formElement?.type),
      distinctUntilChanged(),
      map((type) => {
        if (type) {
          const paletteItem = DEFAULT_FORM_ELEMENT_DESCRIPTORS.find(
            (item) => item.type === type
          );
          return paletteItem?.propsForm;
        } else {
          return null;
        }
      })
    );
  }

  private getChildren(parentId: ID): FormElement[] {
    return this.getAll()
      .filter((element) => element.parentId === parentId)
      .map((element) => {
        if (isParent(element)) {
          return { ...element, children: this.getChildren(element.id) };
        } else {
          return element;
        }
      });
  }
}
