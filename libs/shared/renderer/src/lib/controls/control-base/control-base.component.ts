import {
  Directive,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '../../model';
import { FormComponent } from '../../form/form.component';
import { ControlBaseTemplateComponent } from './control-base-template.component';

@Directive()
export class ControlBaseComponent implements OnInit {
  @ViewChild(ControlBaseTemplateComponent, { static: true })
  controlBaseTemplateComponent!: ControlBaseTemplateComponent;
  private _parent!: FormGroup;
  private _formElement!: any;

  get parent() {
    return this._parent;
  }

  @Input() set parent(parent: FormGroup) {
    this._parent = parent;
    this.controlBaseTemplateComponent.parent = this.parent;
  }

  get formElement() {
    return this._formElement;
  }

  @Input() set formElement(element: FormElement) {
    this._formElement = element;
    this.controlBaseTemplateComponent.formElement = this.formElement;
  }

  get formControlName() {
    return this.formElement?.props.name ?? null;
  }

  @HostBinding('class')
  public get classes() {
    return this.formElement?.props?.classes;
  }

  constructor(private formComponent: FormComponent) {}

  ngOnInit(): void {
    const id = this.formControlName + '_' + Math.random();
    this.controlBaseTemplateComponent.id = id;

    if (this._formElement.visibility?.custom) {
      const control = this.parent.get(this.formControlName);
      this.formComponent.form.valueChanges.subscribe((val) => {
        // todo eval expre
        if (+val.age === 10) {
          if (this.parent.contains(this.formControlName)) {
            this.parent.removeControl(this.formElement.props.name);
            control.reset();
          }
        } else {
          if (!this.parent.contains(this.formControlName)) {
            this.parent.addControl(this.formControlName, control);
            control.updateValueAndValidity();
          }
        }
      });
    }
  }
}
