import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement, FormElementType } from '../../model';

@Component({
  selector: 'formidable-layout',
  template: `
    <ng-container
      *ngFor='let child of formElement.children'
      formidableDynamicField
      [formElement]='child'
      [group]='parent'
    >
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class LayoutComponent {
  @Input() parent: FormGroup;
  @Input() formElement: FormElement;

  @HostBinding('class')
  public get classes() {
    return (
      (this.formElement.type === FormElementType.ROW
        ? ' flex-row gap-4 '
        : ' flex-col ') + (this.formElement?.props?.classes ?? '')
    );
  }
}
