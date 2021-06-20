import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from './controls/input/input.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { FormidableItem, isFormItem, isLayoutItem } from './model';

@Directive({
  selector: '[formidableDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  item: FormidableItem;

  @Input()
  group: FormGroup;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const isLayout = isLayoutItem(this.item) || isFormItem(this.item); // this.item.type !== Type.INPUT;

    // todo lazy load
    const componentType = this.resolver.resolveComponentFactory<any>(
      isLayout ? LayoutComponent : InputComponent
    );
    const component: ComponentRef<
      InputComponent | LayoutComponent
    > = this.container.createComponent(componentType);
    component.instance.item = this.item;
    component.instance.parent = this.group;
  }
}
