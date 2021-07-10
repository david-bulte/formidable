import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormidableItemQuery } from '../state/formidable-item-query.service';

@UntilDestroy()
@Component({
  selector: 'formidable-canvas',
  template: `
    <div class="flex items-center justify-between">
      <h1 class="item">Canvas</h1>
    </div>

    <div class="mt-4 overflow-y-auto h-screen pr-4">
      <div
          class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md"
          *ngIf="!(previewVisible$$ | async)"
      >
        <formidable-item
            [item]="root"
            [isMoveAble]="false"
            [isDroppable]="true"
            *ngIf="root$ | async as root"
        ></formidable-item>
      </div>

      <div
          class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md"
          *ngIf="(formView$ | async) as formView"
      >
        <formidable-preview [item]="formView"></formidable-preview>
      </div>

      <div class="flex flex-row mt-4 gap-x-3">
        <div class="flex-grow">
          <span class="text-red-400" *ngIf="(invalid$ | async) === true">invalid</span>
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
  `,
  styles: [
    `
      .drag--over {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `,
  ],
})
export class CanvasComponent implements OnInit {
  items = [];
  root$ = this.formidableItemQuery.root$;
  previewVisible$$ = new BehaviorSubject(false);
  formView$ = this.previewVisible$$.pipe(
    map((visible) => (visible ? this.formidableItemQuery.getAllAsTree() : null))
  );
  invalid$ = this.formidableItemQuery.invalid$;

  constructor(private formidableItemQuery: FormidableItemQuery) {}

  ngOnInit(): void {}

  setPreview(preview) {
    this.previewVisible$$.next(preview);
  }
}
