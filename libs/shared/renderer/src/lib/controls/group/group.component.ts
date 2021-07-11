import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '@formidable/shared/renderer';

@Component({
  selector: 'formidable-group',
  template: `
    <div>
      <!--      todo label => css?-->
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {{ item.props.label }}
      </label>
      <ng-container [formGroup]="parent">
        <ng-container [formGroupName]="item.props.name">
          <ng-container
            *ngFor="let child of item?.children"
            formidableDynamicField
            [item]="child"
            [group]="parent.get(item.props.name)"
          >
          </ng-container>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class GroupComponent {
  @Input() parent: FormGroup;
  @Input() item: FormElement;

  constructor() {}
}
