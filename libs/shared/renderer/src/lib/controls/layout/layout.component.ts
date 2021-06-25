import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LayoutItem } from '../../model';

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
  `
})
export class LayoutComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() item: LayoutItem;

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  constructor() {}

  ngOnInit(): void {}
}
