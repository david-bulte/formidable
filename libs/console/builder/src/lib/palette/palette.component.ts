import { Component } from '@angular/core';
import {
  FormElementDescriptor,
  PaletteGroup,
} from '@formidable/shared/renderer';
import { DEFAULT_FORM_ELEMENT_DESCRIPTORS } from '../state/form-element-descriptors';

@Component({
  selector: 'formidable-palette',
  template: `
    <div class="flex flex-col">
      <h1 class="title">Palette</h1>
      <div class="card h-full items-start">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          layout</label
        >
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
