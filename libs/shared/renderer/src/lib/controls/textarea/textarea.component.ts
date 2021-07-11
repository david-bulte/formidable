import { Component } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'formidable-input',
  template: `
    <formidable-control-base [formGroup]='parent'>
      <textarea
        class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        [formControlName]='formControlName'
        [attr.rows]='formElement.props.rows || 10'
      ></textarea>
    </formidable-control-base>
  `,
})
export class TextareaComponent extends ControlBaseComponent {}
