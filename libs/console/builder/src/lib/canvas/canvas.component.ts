import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormidableItemQuery } from '../state/formidable-item-query.service';

@UntilDestroy()
@Component({
  selector: 'formidable-canvas',
  template: `
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-700 item">Canvas</h1>
    </div>

    <div class="mt-4 overflow-y-auto h-screen pr-4">
      <div
        class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md"
        *ngIf="preview === false"
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
        *ngIf="preview === true"
      >
        <formidable-preview [item]="formPreview"></formidable-preview>
      </div>

      <div class="flex flex-row justify-end mt-4 gap-x-3">
        <button (click)="preview = false" class="text-blue-500 hover:underline">
          edit
        </button>
        <button (click)="preview = true" class="text-blue-500 hover:underline">
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
  preview = false;
  root$ = this.formidableItemQuery.root$;

  constructor(private formidableItemQuery: FormidableItemQuery) {}

  ngOnInit(): void {}

  get formPreview() {
    return this.formidableItemQuery.getAllAsTree()
  }
}
