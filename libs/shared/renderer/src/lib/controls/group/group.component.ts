import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '../../model';

@Component({
  selector: 'formidable-group',
  template: `
    <div>
      <!--      todo label => css?-->
      <label class='block text-gray-700 text-sm font-bold mb-2'>
        {{ formElement.props.label }}
      </label>
      <ng-container [formGroup]='parent'>
        <ng-container [formGroupName]='formElement.props.name'>
          <ng-container
            *ngFor='let child of formElement?.children'
            formidableDynamicField
            [formElement]='child'
            [group]='parent.get(formElement.props.name)'
          >
          </ng-container>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class GroupComponent {
  @Input() parent: FormGroup;
  @Input() formElement: FormElement;

  constructor() {}
}
