import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-container
        *ngFor="let field of item.children"
        formidableDynamicField
        [item]="field"
        [group]="form"
      >
      </ng-container>

      <button
          [disabled]="form.invalid"
          class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          type="submit"
      >
        Submit
      </button>

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
      // todo defaultValue
      const defaultValue = null;
      // todo validators
      const validators = item.validation?.required ? [Validators.required] : [];
      form.addControl(item.props.name, new FormControl(defaultValue, validators));
    }
  }

  onSubmit() {
    console.log('submitting', this.form.value);
  }
}
