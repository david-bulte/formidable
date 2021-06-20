import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LayoutItem } from '../../model';

@Component({
  selector: 'formidable-layout',
  template: `
    <!--    <div class="{{ config?.properties?.classes }}">-->
    <ng-container
        *ngFor="let field of item.children"
        formidableDynamicField
        [item]="field"
        [group]="parent"
    >
    </ng-container>
    <!--    </div>-->
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LayoutComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() item: LayoutItem;

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  constructor() {}

  ngOnInit(): void {
  }
}
