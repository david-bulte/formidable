import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { SharedRendererModule } from '@formidable/shared/renderer';
import { SharedDragonModule } from '@formidable/shared/dragon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuildPageComponent } from './build-page/build-page.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaletteItemComponent } from './palette-item/palette-item.component';
import { PaletteComponent } from './palette/palette.component';
import { PropertiesComponent } from './properties/properties.component';
import { CanvasItemComponent } from './canvas-item/canvas-item.component';

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
