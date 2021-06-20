import { Component, OnInit } from '@angular/core';
import { PaletteItem, Type } from '@formidable/shared/builder';

@Component({
  selector: 'formidable-palette',
  template: `
    <h1 class="mb-4 text-xl font-bold text-gray-700">Palette</h1>

    <div
      class="flex flex-col items-start bg-white px-6 py-4 rounded-lg shadow-md"
    >
      <formidable-palette-item
        [item]="item"
        *ngFor="let item of items"
      ></formidable-palette-item>
    </div>
  `,
  styles: [
    `
      .box {
        width: 200px;
        height: 200px;
      }
    `,
  ],
})
export class PaletteComponent implements OnInit {
  items: PaletteItem[] = [
    { type: Type.ROW, props: {}, propDescriptors: [] },
    { type: Type.INPUT, props: {}, propDescriptors: [] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
