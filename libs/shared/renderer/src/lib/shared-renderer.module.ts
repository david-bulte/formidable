import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './controls/input/input.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { FormComponent } from './form/form.component';
import { PreviewComponent } from './preview/preview.component';
import { NumberComponent } from './controls/number/number.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    PreviewComponent,
    FormComponent,
    InputComponent,
    DynamicFieldDirective,
    LayoutComponent,
    NumberComponent,
  ],
  exports: [PreviewComponent],
})
export class SharedRendererModule {}
