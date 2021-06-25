import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  Self,
} from '@angular/core';

@Directive({
  selector: '[dragonDraggable]',
})
export class DraggableDirective<T> implements AfterViewInit, OnDestroy {
  @Input('dragonDraggable') enabled = true;
  @Input() dragonData: T;

  constructor(
    @Self() private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!this.enabled) {
      return;
    }

    let el = this.elementRef.nativeElement;
    this.renderer.setProperty(el, 'draggable', true);

    el.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.dropEffect = 'copy';
      ev.dataTransfer.setData('text/plain', JSON.stringify(this.dragonData));
    });

    el.addEventListener('dragend', (ev) => {});
  }

  ngOnDestroy(): void {}
}
