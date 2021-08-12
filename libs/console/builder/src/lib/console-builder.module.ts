import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedDragonModule } from '@formidable/shared/dragon';
import { SharedRendererModule } from '@formidable/shared/renderer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeleportModule } from '@ngneat/overview';
import { BuildPageComponent } from './build-page/build-page.component';
import { CanvasItemComponent } from './canvas-item/canvas-item.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaletteItemComponent } from './palette-item/palette-item.component';
import { PaletteComponent } from './palette/palette.component';
import { PropertiesComponent } from './properties/properties.component';
import { ProjectsComponent } from './projects/projects.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedRendererModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedDragonModule,
    TeleportModule,
    RouterModule,
  ],
  declarations: [
    BuildPageComponent,
    PaletteComponent,
    PaletteItemComponent,
    CanvasComponent,
    PropertiesComponent,
    CanvasItemComponent,
    ProjectsComponent,
    EmptyStateComponent,
    ProjectComponent,
  ],
  exports: [BuildPageComponent, PaletteComponent, CanvasComponent],
})
export class ConsoleBuilderModule {}
