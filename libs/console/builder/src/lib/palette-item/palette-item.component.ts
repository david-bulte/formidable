import { Component, Input } from '@angular/core';
import { FormElementDescriptor } from '@formidable/shared/renderer';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';

@Component({
  selector: 'formidable-palette-item',
  template: `
    <div
      class="palette-item"
      [dragonDraggable]="true"
      [dragonData]="formElementDescriptor"
    >
      <div class="flex flex-row">
        <div class="handle">
          <fa-icon [icon]="grip" class="mx-1"></fa-icon>
        </div>
        <div class="label">{{ formElementDescriptor.type }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PaletteItemComponent {
  @Input() formElementDescriptor!: FormElementDescriptor;
  grip = faGripVertical;
}
