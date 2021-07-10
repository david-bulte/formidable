import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { ControlItem } from '@formidable/shared/renderer';

@Component({
  selector: 'formidable-control-base',
  template: `
    <ng-container *ngIf="item">
      <div class="mb-4" *ngIf="parent.contains(item.props.name)">
        <formidable-label [id]="id" [item]="item"></formidable-label>
        <ng-content></ng-content>
        <formidable-inline-error
          [parent]="parent"
          [item]="item"
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
export class ControlBaseTemplateComponent implements AfterContentInit {
  @Input() parent: FormGroup;
  @Input() item: ControlItem;
  @Input() id: string;

  @ContentChild(FormControlName, { read: ElementRef }) controlEl: ElementRef;

  @HostBinding('class')
  public get classes() {
    return this.item?.props?.classes;
  }

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    this.renderer.setAttribute(this.controlEl.nativeElement, 'id', this.id);
  }
}
