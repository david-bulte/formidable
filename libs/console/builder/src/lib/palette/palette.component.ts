import { Component } from '@angular/core';
import { PaletteGroup } from '@formidable/shared/renderer';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { paletteItems } from '../state/palette-items';

@Component({
  selector: 'formidable-palette',
  template: `
    <h1 class="mb-4">
      Palette
    </h1>

    <div
      class="flex flex-col items-start bg-white px-6 py-4 rounded-lg shadow-md"
    >
      <label class="block text-gray-700 text-sm font-bold mb-2"> layout</label>
      <formidable-palette-item
        [paletteItem]="item"
        *ngFor="let item of layoutItems"
      ></formidable-palette-item>

      <label class="block text-gray-700 text-sm font-bold mb-2"> basic</label>
      <formidable-palette-item
        [paletteItem]="item"
        *ngFor="let item of basicItems"
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
export class PaletteComponent {
  layoutItems = filter(paletteItems, PaletteGroup.LAYOUT);
  basicItems = filter(paletteItems, PaletteGroup.BASIC);
}

function filter(paletteItems, group: PaletteGroup) {
  return paletteItems
    .filter((item) => item.group === group)
    .sort((left, right) => left.type.localeCompare(right.type));
}
