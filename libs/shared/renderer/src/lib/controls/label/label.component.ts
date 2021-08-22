import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LabelFormElement } from '../../model';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

@Component({
  selector: 'formidable-label',
  template: `
    <label class="block text-gray-700 text-sm font-bold mb-2" [attr.for]="id">
      {{ formElement.props?.label }}
      <span class="text-red-400" *ngIf="formElement.props.required">*</span>
      <fa-icon
        [icon]="faInfo"
        [tippy]="formElement.props.tooltip"
        [interactive]="true"
        *ngIf="formElement.props?.tooltip !== undefined"
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
  @Input() parent!: FormGroup;
  @Input() formElement!: LabelFormElement;

  @Input() id!: string;
  faInfo = faInfoCircle;

  @HostBinding('class')
  public get classes() {
    return this.formElement?.props?.classes;
  }
}
