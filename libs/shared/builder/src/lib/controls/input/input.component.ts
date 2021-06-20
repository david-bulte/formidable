import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlConfig, ControlItem, FormidableItem } from '../../model';

@Component({
  selector: 'formidable-input',
  template: `
    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          {{item.props.label}}
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            [formControlName]="item.props.name">
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
export class InputComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() item: ControlItem;

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  constructor() {}

  ngOnInit(): void {}
}
