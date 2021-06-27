import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupComponent } from './controls/group/group.component';
import { InputComponent } from './controls/input/input.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { NumberComponent } from './controls/number/number.component';
import { FormidableItem, Type } from './model';

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
    const componentType = this.getComponentType();
    const componentFactory = this.resolver.resolveComponentFactory<any>(
      componentType
    );

    // todo lazy load
    const component: ComponentRef<
      InputComponent | LayoutComponent | NumberComponent | GroupComponent
    > = this.container.createComponent(componentFactory);
    component.instance.item = this.item;
    component.instance.parent = this.group;
  }

  getComponentType() {
    switch (this.item.type) {
      case Type.COL:
      case Type.ROW:
        return LayoutComponent;
      case Type.NUMBER:
        return NumberComponent;
      case Type.GROUP:
        return GroupComponent;
      default:
        return InputComponent;
    }
  }
}
