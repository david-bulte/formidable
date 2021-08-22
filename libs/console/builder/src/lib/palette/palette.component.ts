import { Component } from '@angular/core';
import {
  FormElementDescriptor,
  PaletteGroup,
} from '@formidable/shared/renderer';
import { DEFAULT_FORM_ELEMENT_DESCRIPTORS } from '../state/form-element-descriptors';

@Component({
  selector: 'formidable-palette',
  template: `
    <h1 class="mb-4">Palette</h1>

    <div
      class="flex flex-col items-start bg-white px-6 py-4 rounded-lg shadow-md"
    >
      <label class="block text-gray-700 text-sm font-bold mb-2"> layout</label>
      <formidable-palette-item
        [formElementDescriptor]="item"
        *ngFor="let item of layoutItems"
      ></formidable-palette-item>

      <label class="block text-gray-700 text-sm font-bold mb-2"> basic</label>
      <formidable-palette-item
        [formElementDescriptor]="item"
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
  layoutItems = filter(DEFAULT_FORM_ELEMENT_DESCRIPTORS, PaletteGroup.LAYOUT);
  basicItems = filter(DEFAULT_FORM_ELEMENT_DESCRIPTORS, PaletteGroup.BASIC);
}

function filter(
  formElementDescriptors: FormElementDescriptor[],
  group: PaletteGroup
) {
  return formElementDescriptors
    .filter((item) => item.group === group)
    .sort((left, right) => left.type.localeCompare(right.type));
}
