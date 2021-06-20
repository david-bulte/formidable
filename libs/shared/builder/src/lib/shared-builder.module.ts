import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './controls/input/input.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { LayoutComponent } from './controls/layout/layout.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    PreviewComponent,
    FormComponent,
    InputComponent,
    DynamicFieldDirective,
    LayoutComponent
  ],
  exports: [PreviewComponent]
})
export class SharedBuilderModule {}
