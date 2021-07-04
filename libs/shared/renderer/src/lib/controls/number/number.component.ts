import { Component } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'formidable-number',
  template: `
    <formidable-control-base [formGroup]="parent">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        [formControlName]="formControlName"
      />
    </formidable-control-base>
  `,
})
export class NumberComponent extends ControlBaseComponent {}
