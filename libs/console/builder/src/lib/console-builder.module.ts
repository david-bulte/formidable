import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDragonModule } from '@formidable/shared/dragon';
import { SharedRendererModule } from '@formidable/shared/renderer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuildPageComponent } from './build-page/build-page.component';
import { CanvasItemComponent } from './canvas-item/canvas-item.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaletteItemComponent } from './palette-item/palette-item.component';
import { PaletteComponent } from './palette/palette.component';
import { PropertiesComponent } from './properties/properties.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRendererModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedDragonModule,
  ],
  declarations: [
    BuildPageComponent,
    PaletteComponent,
    PaletteItemComponent,
    CanvasComponent,
    PropertiesComponent,
    CanvasItemComponent,
  ],
  exports: [BuildPageComponent, PaletteComponent, CanvasComponent],
})
export class ConsoleBuilderModule {}
