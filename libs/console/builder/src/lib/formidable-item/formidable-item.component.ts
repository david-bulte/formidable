import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormidableItem } from '@formidable/shared/renderer';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormidableItemQuery } from '../state/formidable-item-query.service';
import { FormidableItemService } from '../state/formidable-item.service';

@Component({
  selector: 'formidable-item',
  template: `
    <div
      class="bg-gray-100 pl-1 pr-2 py-2 my-1 rounded flex flex-row palette-item__container"
      [dragonDraggable]="isMoveAble || isCopyAble"
      [dragonData]="item"
    >
      <div class="handle">
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
        </div>

        <formidable-item
          [item]="child"
          [isMoveAble]="true"
          [isDroppable]="true"
          *ngFor="let child of children$ | async"
        ></formidable-item>

<!--        todo-->
        <div
          class="drop-zone w-full h-auto bg-blue-100 pb-5"
          style="min-height: 3rem;"
          [dragonDroppable]="isDroppable"
          (dragonDrop)="onDrop($event)"
          *ngIf="isDroppable && (item.type === 'row' || item.type === 'form' || item.type === 'group')"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .drop-zone.drag--over {
        background-color: green !important;
      }

      .handle {
        cursor: move;
      }

      .active {
        background-color: yellow;
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

  constructor(
    private formidableItemQuery: FormidableItemQuery,
    private formidableItemService: FormidableItemService
  ) {}

  onSelect() {
    this.formidableItemService.setActive(this.item.id);
  }

  ngOnInit(): void {
    this.children$ = this.formidableItemQuery.selectAll({
      filterBy: (item: FormidableItem) => item.parentId === this.item.id,
    });
  }

  // todo group
  onDrop(dragonEvent: { data: FormidableItem }) {
    this.formidableItemService.add({
      ...dragonEvent.data,
      parentId: this.item.id,
    });
  }
}
