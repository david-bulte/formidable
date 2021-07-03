import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  Self,
} from '@angular/core';
import { DraghandleDirective } from './draghandle.directive';

@Directive({
  selector: '[dragonDraggable]',
})
export class DraggableDirective<T> implements AfterViewInit, OnDestroy {
  @Input('dragonDraggable') enabled = true;
  @Input() dragonCopy = true;
  @Input() dragonData: T;

  @ContentChild(DraghandleDirective) draghandle: DraghandleDirective;

  constructor(
    @Self() private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!this.enabled) {
      return;
    }

    const el = this.elementRef.nativeElement;

    const ondragstart = (ev) => {
      if (this.dragonCopy) {
        ev.dataTransfer.dropEffect = 'copy';
      } else {
        this.renderer.addClass(el, 'draggable--moving');
        ev.dataTransfer.dropEffect = 'move';
      }

      // dropEffect doesn't always work in chrome - in droppable.directive it always equals 'none'
      ev.dataTransfer.setData(
        'text/plain',
        JSON.stringify({ data: this.dragonData, copy: this.dragonCopy })
      );
    };

    const ondragend = (ev) => {
      if (ev.dataTransfer.dropEffect === 'none') {
        this.renderer.removeClass(el, 'draggable--moving');
      }
    };

    if (this.draghandle) {
      this.renderer.listen(
        this.draghandle.elRef.nativeElement,
        'mousedown',
        () => {
          this.renderer.setProperty(el, 'draggable', true);
          el.addEventListener('dragstart', ondragstart);
          el.addEventListener('dragend', ondragend);
        }
      );
      this.renderer.listen(
        this.draghandle.elRef.nativeElement,
        'mouseup',
        () => {
          this.renderer.setProperty(el, 'draggable', false);
          el.removeEventListener('dragstart', ondragstart);
          el.removeEventListener('dragend', ondragend);
        }
      );
    } else {
      this.renderer.setProperty(el, 'draggable', true);
      el.addEventListener('dragstart', ondragstart);
      el.addEventListener('dragend', ondragend);
    }
  }

  ngOnDestroy(): void {}
}
