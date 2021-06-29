import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { ControlItem } from '../../model';

@Component({
  selector: 'formidable-input',
  template: `
    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <formidable-label [id]="id" [item]="item"></formidable-label>
        <!--        todo invalid styling-->
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          [attr.id]="id"
          type="text"
          [formControlName]="item.props.name"
        />
        <!--        todo valdemort?-->
        {{ parent.get(item.props.name)?.errors | json }}
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

  id: string;
  faInfo = faInfoCircle;

  constructor() {}

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  ngOnInit(): void {
    this.id = this.item.props.name + '_' + Math.random();
  }
}
