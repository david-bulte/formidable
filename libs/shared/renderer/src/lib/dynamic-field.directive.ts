import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { GroupComponent } from './controls/group/group.component';
import { InputComponent } from './controls/input/input.component';
import { LabelComponent } from './controls/label/label.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { NumberComponent } from './controls/number/number.component';
import { RepeatComponent } from './controls/repeat/repeat.component';
import { SelectComponent } from './controls/select/select.component';
import { TextareaComponent } from './controls/textarea/textarea.component';
import { FormElement, FormElementType } from './model';

@Directive({
  selector: '[formidableDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  formElement: FormElement;

  @Input()
  group: FormGroup;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const componentType = this.getComponentType();
    const componentFactory = this.resolver.resolveComponentFactory<any>(
      componentType
    );

    // todo lazy load
    const component: ComponentRef<
      | InputComponent
      | LayoutComponent
      | LabelComponent
      | NumberComponent
      | GroupComponent
      | CheckboxComponent
      | SelectComponent
      | TextareaComponent
    > = this.container.createComponent(componentFactory);
    component.instance.formElement = this.formElement;
    component.instance.parent = this.group;
  }

  getComponentType() {
    switch (this.formElement.type) {
      case FormElementType.COL:
      case FormElementType.ROW:
        return LayoutComponent;
      case FormElementType.LABEL:
        return LabelComponent;
      case FormElementType.NUMBER:
        return NumberComponent;
      case FormElementType.GROUP:
        return GroupComponent;
      case FormElementType.CHECKBOX:
        return CheckboxComponent;
      case FormElementType.SELECT:
        return SelectComponent;
      case FormElementType.REPEAT:
        return RepeatComponent;
      case FormElementType.TEXTAREA:
        return TextareaComponent;
      default:
        return InputComponent;
    }
  }
}
