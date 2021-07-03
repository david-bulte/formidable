import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DraghandleDirective } from './draghandle.directive';
import { DroppableDirective } from './droppable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DraggableDirective, DroppableDirective, DraghandleDirective],
  exports: [DraggableDirective, DroppableDirective, DraghandleDirective],
})
export class SharedDragonModule {}
