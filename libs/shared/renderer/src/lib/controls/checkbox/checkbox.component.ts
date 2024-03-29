import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxFormElement, FormElement } from '../../model';

@Component({
  selector: 'formidable-checkbox',
  template: `
    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <label class="flex items-center">
          <input
            type="checkbox"
            class="form-checkbox"
            [formControlName]="formElement.props.name"
          />
          <span class="ml-2">{{ formElement.props.label }}</span>
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
  @Input() parent!: FormGroup;
  @Input() formElement!: CheckboxFormElement;

  @HostBinding('class')
  public get classes() {
    return this.formElement?.props?.classes;
  }
}
