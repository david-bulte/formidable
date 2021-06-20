import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FormidableItem,
  FormItem,
  isFormItem,
  isLayoutItem,
  LayoutItem,
} from '../model';

@Component({
  selector: 'formidable-form',
  template: `
    <form [formGroup]="form">
      <ng-container
        *ngFor="let field of item.children"
        formidableDynamicField
        [item]="field"
        [group]="form"
      >
      </ng-container>
    </form>

    <div>value: {{ form.value | json }}</div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  @Input() item: FormItem;

  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = this.createFormGroup(this.item);
  }

  private createFormGroup(item: FormItem | LayoutItem) {
    const group = new FormGroup({});
    item.children.forEach((item) => this.addControl(group, item));
    return group;
  }

  private addControl(form: FormGroup, item: FormidableItem) {
    if (isFormItem(item) || isLayoutItem(item)) {
      item.children.forEach((item) => {
        this.addControl(form, item);
      });
    } else {
      form.addControl(item.props.name, new FormControl());
    }
  }
}
