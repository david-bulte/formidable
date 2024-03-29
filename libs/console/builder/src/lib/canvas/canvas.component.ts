import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormElementQuery } from '../state/form-element-query.service';

@UntilDestroy()
@Component({
  selector: 'formidable-canvas',
  template: `
    <div class="flex flex-col">
      <h1 class="title mr-8">Canvas</h1>
      <div class="overflow-y-scroll h-screen pr-4">
        <div class="card" *ngIf="(previewVisible$$ | async) === false">
          <formidable-canvas-item
            [formElement]="root"
            [isMoveAble]="false"
            [isDroppable]="true"
            *ngIf="rootFormElementBuilderView$ | async as root"
          ></formidable-canvas-item>
        </div>

        <div
          class="card"
          *ngIf="rootFormElementPreviewView$ | async as formView"
        >
          <formidable-preview [formElement]="formView"></formidable-preview>
        </div>

        <div class="flex flex-row mt-4 gap-x-3">
          <div class="flex-grow">
            <span class="text-red-400" *ngIf="(invalid$ | async) === true"
              >invalid</span
            >
          </div>
          <button
            (click)="setPreview(false)"
            class="text-blue-500 hover:underline"
          >
            edit
          </button>
          <button
            (click)="setPreview(true)"
            [disabled]="(invalid$ | async) === true"
            class="text-blue-500 hover:underline"
          >
            preview
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .drag--over {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `,
  ],
})
export class CanvasComponent {
  rootFormElementBuilderView$ =
    this.formElementQuery.rootFormElementBuilderView$;
  previewVisible$$ = new BehaviorSubject(false);
  rootFormElementPreviewView$ = this.previewVisible$$.pipe(
    map((visible) =>
      visible ? this.formElementQuery.getRootFormElementPreviewView() : null
    )
  );
  invalid$ = this.formElementQuery.invalid$;

  constructor(private formElementQuery: FormElementQuery) {}

  setPreview(preview: boolean) {
    this.previewVisible$$.next(preview);
  }
}
