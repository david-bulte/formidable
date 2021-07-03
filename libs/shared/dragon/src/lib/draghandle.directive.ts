import { Directive, ElementRef, Self } from '@angular/core';

@Directive({
  selector: '[dragonHandle]'
})
export class DraghandleDirective {

  constructor(@Self() public elRef: ElementRef) { }

}
