import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement, FormElementType } from '../../model';

@Component({
  selector: 'formidable-layout',
  template: `
    <ng-container
      *ngFor="let child of item.children"
      formidableDynamicField
      [item]="child"
      [group]="parent"
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
  @Input() item: FormElement;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return (
      (this.item.type === FormElementType.ROW
        ? ' flex-row gap-4 '
        : ' flex-col ') + (this.item?.props?.classes ?? '')
    );
  }
}
