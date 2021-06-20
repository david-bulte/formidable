import { Component, OnInit, Renderer2 } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormSchemeQuery } from '../state/form-scheme.query';
import { FormSchemeService } from '../state/form-scheme.service';
import { PaletteItemService } from '../state/palette-item.service';
import { PalettteItemQuery } from '../state/palettte-item.query';

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
        
<!--        [dragonDroppable]="true"-->
<!--        (dragonDrop)="onDrop($event)"-->
        <formidable-item
          [item]="root"
          [isMoveAble]="false"
          [isDroppable]="true"
          *ngIf="(root$ | async) as root"
        ></formidable-item>
        <!--        <formidable-palette-item-->
        <!--            [item]="item"-->
        <!--            [isMoveAble]="true"-->
        <!--            [isDroppable]="true"-->
        <!--            (select)="onSelect(item)"-->
        <!--            *ngFor="let item of items"-->
        <!--        ></formidable-palette-item>-->
      </div>

      <div
        class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md"
        *ngIf="preview === true"
      >
        <formidable-preview></formidable-preview>
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
  root$ = this.formSchemeQuery.root$;

  constructor(
    private renderer: Renderer2,
    private formSchemeQuery: FormSchemeQuery,
    private formSchemeService: FormSchemeService,
    private paletteItemService: PaletteItemService,
    private paletteItemQuery: PalettteItemQuery
  ) {}

  ngOnInit(): void {
    // this.paletteItemQuery.selectAll().subscribe((items) => {
    //   this.items = items;
    // });
    // this.formSchemeQuery
    //   .select('formConfig')
    //   .pipe(map((config) => config?.children ?? []))
    //   .subscribe((items) => {
    //     this.items = items;
    //   });
    // // todo for the time being only 1 level
    // this.formSchemeQuery.all$
    //   // .select('root')
    //   // .pipe(map((config) => config?.children ?? []))
    //   .subscribe((items) => {
    //     this.items = items;
    //   });
  }

  // onDrop($event) {
  //   this.formSchemeService.add($event, 0);
  // }
  //
  // // todo types
  // onSelect(item: FormItem) {
  //   // this.paletteItemService.setActive(paletteItemId);
  //   this.formSchemeService.setActive(item.id);
  // }
}
