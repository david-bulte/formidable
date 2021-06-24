import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '@formidable/shared/builder';

@Component({
  selector: 'formidable-number',
  template: `
    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <label
            class="block text-gray-700 text-sm font-bold mb-2"
            [attr.id]="id"
        >
          {{ item.props.label }}
        </label>
        <!--        todo invalid styling-->
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [attr.id]="id"
            type="number"
            [formControlName]="item.props.name"
        />
        <!--        todo valdemort?-->
        {{parent.get(item.props.name).errors | json}}
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NumberComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() item: ControlItem;

  id: string;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  ngOnInit(): void {
    this.id = this.item.props.name + '_' + Math.random();
  }
}
