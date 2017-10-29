import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  forwardRef,
  Input, Output,
  ViewChild
} from '@angular/core';
import {OptionsComponent} from '../questions/options.component';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuestionBase} from '../question-base';
import {InputComponent} from '../questions/input.component';
import {CustomFormDirective} from './custom-form.directive';
import {debug} from 'util';

@Component({
  selector: 'app-custom-form-component',
  template: `
              <ng-template custom-host></ng-template>
            `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomFormComponent),
    multi: true
  }]
})
export class CustomFormComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild(CustomFormDirective) host: CustomFormDirective;
  // @Input() question: QuestionBase<any>;
  @Input() question: any;
  @Input() form: FormGroup;

  private componentRef: ComponentRef<any>;
  private onChange;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  //
  writeValue(obj: any): void {
    if (this.componentRef) {
      (<InputComponent>this.componentRef.instance).question = this.question;
      (<InputComponent>this.componentRef.instance).form = this.form;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadComponent();
    });
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.question.component);

    let viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);

    (<InputComponent>this.componentRef.instance).question = this.question;
    (<InputComponent>this.componentRef.instance).form = this.form;

    (<InputComponent>this.componentRef.instance).change.subscribe($event => {
      console.log($event);
      this.onChange($event);
    });
  }
}
