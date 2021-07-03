import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LayoutItem, Type } from '../../model';

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
  @Input() item: LayoutItem;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return (
      (this.item.type === Type.ROW ? ' flex-row gap-4 ' : ' flex-col ') +
      (this.item?.props?.classes ?? '')
    );
  }
}
