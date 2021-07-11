import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormElement } from '@formidable/shared/renderer';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormElementQuery } from '../state/form-element-query.service';
import { FormElementService } from '../state/form-element.service';
import { paletteItems } from '../state/palette-items';

@Component({
  selector: 'formidable-canvas-item',
  template: `
    <div
      class="bg-gray-100 pl-1 pr-2 py-2 my-1 rounded flex flex-row palette-item__container w-full"
      [dragonDraggable]="isMoveAble || isCopyAble"
      [dragonData]="item"
      [dragonCopy]="false"
    >
      <div class="handle" dragonHandle>
        <fa-icon [icon]="grip" class="mx-1"></fa-icon>
      </div>
      <div class="flex flex-col flex-1 ">
        <div
          class="flex flex-row"
          (click)="onSelect()"
          [class.active]="isActive$ | async"
        >
          <div class="label">
            {{ item.type }} ({{ item.id }}, {{ item.props?.label }})
          </div>
          <button (click)="onRemove()" *ngIf="!!item.parentId">
            <fa-icon [icon]="times"></fa-icon>
          </button>
          <fa-icon [icon]="exclamation" *ngIf="invalid"></fa-icon>
        </div>

        <div
          class="flex w-full"
          [class.flex-row]="item.type === 'row'"
          [class.flex-col]="item.type !== 'row'"
        >
          <formidable-canvas-item
            [item]="child"
            [isMoveAble]="true"
            [isDroppable]="true"
            *ngFor="let child of children$ | async"
          ></formidable-canvas-item>

          <div
            class="drop-zone w-full h-auto bg-blue-100 pb-5"
            [dragonDroppable]="isDroppable"
            (dragonDrop)="onDrop($event)"
            *ngIf="
              isDroppable &&
              (item.type === 'row' ||
                item.type === 'col' ||
                item.type === 'form' ||
                item.type === 'group')
            "
          ></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .drop-zone {
        min-height: 3rem;
      }

      /*todo check inline scss*/
      .drop-zone.drag--over {
        background-color: green !important;
      }

      .handle {
        cursor: move;
      }

      .active {
        background-color: yellow;
      }

      .drag--enter {
      }
    `,
  ],
})
export class CanvasItemComponent implements OnInit {
  @Input() item: FormElement;
  @Input() isCopyAble = false;
  @Input() isMoveAble = false;
  @Input() isDraggable = false;
  @Input() isDroppable = false;
  @Output() select = new EventEmitter();

  children$: Observable<FormElement[]>;
  isActive$ = this.formElementQuery
    .selectActiveId()
    .pipe(map((activeId) => activeId === this.item.id));

  grip = faGripVertical;
  times = faTimesCircle;
  exclamation = faExclamationCircle;

  constructor(
    private formElementQuery: FormElementQuery,
    private formElementService: FormElementService
  ) {}

  get invalid() {
    return paletteItems
      .find((paletteItem) => paletteItem.type === this.item.type)
      .requiredProps.some((requiredProp) => !this.item.props[requiredProp]);
  }

  onSelect() {
    this.formElementService.setActive(this.item.id);
  }

  onRemove() {
    this.formElementService.remove(this.item.id);
  }

  ngOnInit(): void {
    this.children$ = this.formElementQuery.selectAll({
      filterBy: (item: FormElement) => item.parentId === this.item.id,
    });
  }

  onDrop(dragonEvent: { data: FormElement; copy: boolean }) {
    if (dragonEvent.copy) {
      this.formElementService.add({
        ...dragonEvent.data,
        parentId: this.item.id,
      });
    } else {
      this.formElementService.update(dragonEvent.data.id, {
        ...dragonEvent.data,
        parentId: this.item.id,
      });
    }
  }
}
