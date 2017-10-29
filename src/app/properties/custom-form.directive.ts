import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[custom-host]',
})
export class CustomFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
