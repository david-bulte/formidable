import {
  Directive,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '@formidable/shared/renderer';
import { ControlBaseTemplateComponent } from './control-base-template.component';

@Directive()
export class ControlBaseComponent implements OnInit {
  @ViewChild(ControlBaseTemplateComponent, { static: true })
  controlBaseTemplateComponent: ControlBaseTemplateComponent;
  private _parent: FormGroup;
  private _item: ControlItem;

  get parent() {
    return this._parent;
  }

  @Input() set parent(parent: FormGroup) {
    this._parent = parent;
    this.controlBaseTemplateComponent.parent = this.parent;
  }

  get item() {
    return this._item;
  }

  @Input() set item(item: ControlItem) {
    this._item = item;
    this.controlBaseTemplateComponent.item = this.item;
  }

  get formControlName() {
    return this.item?.props.name ?? null;
  }

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  ngOnInit(): void {
    const id = this.item.props.name + '_' + Math.random();
    this.controlBaseTemplateComponent.id = id;
  }
}
