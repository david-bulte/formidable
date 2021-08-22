import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { FormComponent } from '../../form/form.component';
import { FormElement, InputFormElement } from '../../model';

@Component({
  template: `
    <!--      <formidable-control-base [formGroup]="parent">-->
    <!--          <input-->
    <!--                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"-->
    <!--                  type="text"-->
    <!--                  [formControlName]="formControlName"-->
    <!--          />-->
    <!--      </formidable-control-base>-->

    <ng-container [formGroup]="parent">
      <div class="mb-4">
        <formidable-label
          [id]="id"
          [formElement]="formElement"
        ></formidable-label>
        <input
          [attr.id]="id"
          type="text"
          [formControlName]="formElement.props.name"
          *ngIf="parent.contains(formElement.props.name)"
        />

        <!-- todo does it work with visibility check *ngIf="parent.contains(item.props.name)"-->
        <formidable-inline-error
          [parent]="parent"
          [formElement]="formElement"
        ></formidable-inline-error>
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
  @Input() parent!: FormGroup;
  @Input() formElement!: InputFormElement;

  id: string;
  faInfo = faInfoCircle;

  constructor(private formComponent: FormComponent) {}

  @HostBinding('class')
  public get classes() {
    return this.formElement?.props?.classes;
  }

  ngOnInit(): void {
    this.id = this.formElement.props.name + '_' + Math.random();

    if (this.formElement.visibility?.custom) {
      const formControlName = this.formElement.props.name;
      const control = this.parent.get(formControlName);
      this.formComponent.form.valueChanges.subscribe((val) => {
        // todo eval expre
        if (+val.a === 10) {
          if (this.parent.contains(formControlName)) {
            this.parent.removeControl(this.formElement.props.name);
            control.reset();
          }
        } else {
          if (!this.parent.contains(formControlName)) {
            this.parent.addControl(formControlName, control);
            control.updateValueAndValidity();
          }
        }
      });
    }
  }
}
