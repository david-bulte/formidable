import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { SharedRendererModule } from '@formidable/shared/renderer';
import { SharedDragNDropModule } from '@formidable/shared/drag-n-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../../../apps/console/src/environments/environment';
import { BuildPageComponent } from './build-page/build-page.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaletteItemComponent } from './palette-item/palette-item.component';
import { PaletteComponent } from './palette/palette.component';
import { PropertiesComponent } from './properties/properties.component';
import { FormidableItemComponent } from './formidable-item/formidable-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRendererModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    // todo
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    SharedDragNDropModule,
  ],
  declarations: [
    BuildPageComponent,
    PaletteComponent,
    PaletteItemComponent,
    CanvasComponent,
    PropertiesComponent,
    FormidableItemComponent,
  ],
  exports: [BuildPageComponent, PaletteComponent, CanvasComponent],
})
export class ConsoleBuilderModule {}
