import { Component } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  template: `
    <formidable-control-base [formGroup]="parent">
      <ng-container [ngSwitch]="formElement.props.mode">
        <div *ngSwitchCase="'radio'">
          <label
            class="mb-4 flex items-center"
            *ngFor="let option of formElement.props.options"
          >
            <input
              type="radio"
              class="form-radio"
              [value]="option.value"
              [formControlName]="formControlName"
            />
            <span class="ml-2">{{ option.label }}</span>
          </label>
        </div>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          [formControlName]="formControlName"
          *ngSwitchDefault
        >
          <option
            [value]="option.value"
            *ngFor="let option of formElement.props.options"
          >
            {{ option.label }}
          </option>
        </select>
      </ng-container>
    </formidable-control-base>
  `,
})
export class SelectComponent extends ControlBaseComponent {}
