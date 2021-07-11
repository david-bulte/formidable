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
import { FormElement } from '@formidable/shared/renderer';

@Component({
  selector: 'formidable-control-base',
  template: `
    <ng-container *ngIf='formElement'>
      <div class='mb-4' *ngIf='parent.contains(formElement.props.name)'>
        <formidable-label [id]='id' [formElement]='formElement'></formidable-label>
        <ng-content></ng-content>
        <formidable-inline-error
          [parent]='parent'
          [formElement]='formElement'
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
  @Input() formElement: FormElement;
  @Input() id: string;

  @ContentChild(FormControlName, { read: ElementRef }) controlEl: ElementRef;

  @HostBinding('class')
  public get classes() {
    return this.formElement?.props?.classes;
  }

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    this.renderer.setAttribute(this.controlEl.nativeElement, 'id', this.id);
  }
}
