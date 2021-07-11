import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '@formidable/shared/renderer';

@Component({
  selector: 'formidable-checkbox',
  template: `
    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <label class="flex items-center">
          <input
            type="checkbox"
            class="form-checkbox"
            [formControlName]="item.props.name"
          />
          <span class="ml-2">{{ item.props.label }}</span>
        </label>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CheckboxComponent {
  @Input() parent: FormGroup;
  @Input() item: FormElement;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }
}
