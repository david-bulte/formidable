import { Component, Input } from '@angular/core';
import { PaletteItem } from '@formidable/shared/renderer';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';

@Component({
  selector: 'formidable-palette-item',
  template: `
    <div
      class="bg-gray-100 pl-1 pr-2 py-2 my-1 rounded flex flex-col palette-item__container"
      [dragonDraggable]="true"
      [dragonData]="paletteItem"
    >
      <!--      todo move type-->
      <div class="flex flex-row">
        <div class="handle">
          <fa-icon [icon]="grip" class="mx-1"></fa-icon>
        </div>
        <div class="label">{{ paletteItem.type }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .handle {
        cursor: move;
      }
    `,
  ],
})
export class PaletteItemComponent {
  @Input() paletteItem: PaletteItem;
  grip = faGripVertical;
}
