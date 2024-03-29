import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2, Self } from '@angular/core';

@Directive({
  selector: '[dragonDroppable]',
})
export class DroppableDirective<T> implements AfterViewInit {
  @Input('dragonDroppable') enabled = true;
  @Output() dragonDrop = new EventEmitter<{ data: T; copy: boolean }>();

  constructor(
    @Self() private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!this.enabled) {
      return;
    }

    const el = this.elementRef.nativeElement;

    this.renderer.listen(el, 'drop', (ev: DragEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      this.renderer.removeClass(el, 'drag--over');
      const data = ev.dataTransfer.getData('text/plain');

      const dataTransferObject: {data, copy} = JSON.parse(data);
      this.dragonDrop.emit(dataTransferObject);
    });

    this.renderer.listen(el, 'dragover', (ev) => {
      ev.preventDefault();

      this.renderer.addClass(el, 'drag--over');
      ev.dataTransfer.dropEffect = 'copy';
    });

    this.renderer.listen(el, 'dragleave', (ev) => {
      ev.preventDefault();
      this.renderer.removeClass(el, 'drag--over');
    });
  }
}
