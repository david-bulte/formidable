import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormElement } from '@formidable/shared/renderer';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DEFAULT_FORM_ELEMENT_DESCRIPTORS } from '../state/form-element-descriptors';
import { FormElementQuery } from '../state/form-element-query.service';
import { FormElementService } from '../state/form-element.service';

@Component({
  selector: 'formidable-canvas-item',
  template: `
    <div
      class="canvas-item"
      [class.active]="isActive$ | async"
      [dragonDraggable]="isMoveAble || isCopyAble"
      [dragonData]="formElement"
      [dragonCopy]="false"
    >
      <div class="handle" dragonHandle>
        <fa-icon [icon]="grip" class="mx-1"></fa-icon>
      </div>
      <div class="flex flex-col flex-1 ">
        <div
          class="flex flex-row"
          (click)="onSelect()"
          [class.mb-2]="(children$ | async)?.length > 0"
        >
          <div class="label flex-grow">
            {{ formElement.type }} ({{ formElement.id }},
          </div>
          <fa-icon
            class="mr-1 text-red-400"
            [icon]="exclamation"
            *ngIf="invalid"
          ></fa-icon>
          <button
            class="self-end text-gray-300 hover:text-green-300"
            (click)="onRemove()"
            *ngIf="!!formElement.parentId"
          >
            <fa-icon [icon]="times"></fa-icon>
          </button>
        </div>

        <div
          class="flex w-full"
          [class.flex-row]="formElement.type === 'row'"
          [class.flex-col]="formElement.type !== 'row'"
        >
          <formidable-canvas-item
            [formElement]="child"
            [isMoveAble]="true"
            [isDroppable]="true"
            *ngFor="let child of children$ | async"
          ></formidable-canvas-item>

          <div
            class="drop-zone canvas-item flex flex-row align-middle justify-center"
            [dragonDroppable]="isDroppable"
            (dragonDrop)="onDrop($event)"
            *ngIf="
              isDroppable &&
              (formElement.type === 'row' ||
                formElement.type === 'col' ||
                formElement.type === 'form' ||
                formElement.type === 'group')
            "
          >
            dropzone
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .drag--enter {
      }
    `,
  ],
})
export class CanvasItemComponent implements OnInit, OnChanges {
  @Input() formElement!: FormElement;
  @Input() isCopyAble = false;
  @Input() isMoveAble = false;
  @Input() isDraggable = false;
  @Input() isDroppable = false;

  children$!: Observable<FormElement[]>;
  isActive$ = this.formElementQuery
    .selectActiveId()
    .pipe(map((activeId) => activeId === this.formElement.id));

  grip = faGripVertical;
  times = faTimesCircle;
  exclamation = faExclamationCircle;

  private formElementIdSubj = new BehaviorSubject(null);

  constructor(
    private formElementQuery: FormElementQuery,
    private formElementService: FormElementService
  ) {}

  get invalid() {
    return DEFAULT_FORM_ELEMENT_DESCRIPTORS.find(
      (paletteItem) => paletteItem.type === this.formElement.type
    ).requiredProps.some(
      (requiredProp) => !this.formElement.props[requiredProp]
    );
  }

  onSelect() {
    this.formElementService.setActive(this.formElement.id);
  }

  onRemove() {
    this.formElementService.remove(this.formElement.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['formElement'];
    if (change) {
      this.formElementIdSubj.next(this.formElement?.id);
    }
  }

  ngOnInit(): void {
    this.children$ = this.formElementIdSubj.pipe(
      switchMap((formElementId) =>
        this.formElementQuery.selectAll({
          filterBy: (element: FormElement) =>
            element.parentId === formElementId,
        })
      )
    );
  }

  onDrop(dragonEvent: { data: FormElement; copy: boolean }) {
    if (dragonEvent.copy) {
      this.formElementService.add({
        ...dragonEvent.data,
        parentId: this.formElement.id,
      });
    } else {
      this.formElementService.update(dragonEvent.data.id, {
        ...dragonEvent.data,
        parentId: this.formElement.id,
      });
    }
  }
}
