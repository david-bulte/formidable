import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormidableItem } from '@formidable/shared/renderer';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormidableItemQuery } from '../state/formidable-item-query.service';
import { FormidableItemService } from '../state/formidable-item.service';
import { paletteItems } from '../state/palette-items';

@Component({
  selector: 'formidable-item',
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
          <formidable-item
            [item]="child"
            [isMoveAble]="true"
            [isDroppable]="true"
            *ngFor="let child of children$ | async"
          ></formidable-item>

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
export class FormidableItemComponent implements OnInit {
  @Input() item: FormidableItem;
  @Input() isCopyAble = false;
  @Input() isMoveAble = false;
  @Input() isDraggable = false;
  @Input() isDroppable = false;
  @Output() select = new EventEmitter();

  children$: Observable<FormidableItem[]>;
  isActive$ = this.formidableItemQuery
    .selectActiveId()
    .pipe(map((activeId) => activeId === this.item.id));

  grip = faGripVertical;
  times = faTimesCircle;
  exclamation = faExclamationCircle;

  get invalid() {
    return paletteItems
      .find((paletteItem) => paletteItem.type === this.item.type)
      .requiredProps.some((requiredProp) => !this.item.props[requiredProp]);
  }

  constructor(
    private formidableItemQuery: FormidableItemQuery,
    private formidableItemService: FormidableItemService
  ) {}

  onSelect() {
    this.formidableItemService.setActive(this.item.id);
  }

  onRemove() {
    this.formidableItemService.remove(this.item.id);
  }

  ngOnInit(): void {
    this.children$ = this.formidableItemQuery.selectAll({
      filterBy: (item: FormidableItem) => item.parentId === this.item.id,
    });
  }

  // todo group
  onDrop(dragonEvent: { data: FormidableItem; copy: boolean }) {
    console.log('dragonEvent', dragonEvent);
    if (dragonEvent.copy) {
      this.formidableItemService.add({
        ...dragonEvent.data,
        parentId: this.item.id,
      });
    } else {
      this.formidableItemService.update(dragonEvent.data.id, {
        ...dragonEvent.data,
        parentId: this.item.id,
      });
    }
  }
}
