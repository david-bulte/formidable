import { Component, Input } from '@angular/core';
import { FormElement } from '../model';

@Component({
  selector: 'formidable-preview',
  template: `
    <formidable-form
      [formElement]="formElement"
      (submitForm)="value = $event"
    ></formidable-form>

    <pre>
        {{ value | json }}
    </pre
    >
  `,
  styles: [],
})
export class PreviewComponent {
  @Input() formElement!: FormElement;
  value: any;
}
