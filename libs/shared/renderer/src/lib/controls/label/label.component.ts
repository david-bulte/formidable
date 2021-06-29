import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '@formidable/shared/renderer';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

@Component({
  selector: 'formidable-label',
  template: `
    <label class="block text-gray-700 text-sm font-bold mb-2" [attr.for]="id">
      {{ item.props.label }} <span class="text-red-400" *ngIf="item.validation.required">*</span>
      <fa-icon
        [icon]="faInfo"
        [tippy]="item.props.tooltip"
        [interactive]="true"
        *ngIf="item.props.tooltip !== undefined"
      ></fa-icon>
    </label>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LabelComponent {
  // todo can be removed
  @Input() parent: FormGroup;
  @Input() item: ControlItem;

  @Input() id: string;
  faInfo = faInfoCircle;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }
}
