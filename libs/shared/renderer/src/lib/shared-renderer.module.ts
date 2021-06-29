import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TippyModule } from '@ngneat/helipopper';
import { InputComponent } from './controls/input/input.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { FormComponent } from './form/form.component';
import { PreviewComponent } from './preview/preview.component';
import { NumberComponent } from './controls/number/number.component';
import { GroupComponent } from './controls/group/group.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { TextareaComponent } from './controls/textarea/textarea.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, TippyModule],
  declarations: [
    PreviewComponent,
    FormComponent,
    InputComponent,
    DynamicFieldDirective,
    LayoutComponent,
    NumberComponent,
    GroupComponent,
    CheckboxComponent,
    TextareaComponent,
  ],
  exports: [PreviewComponent, FormComponent],
})
export class SharedRendererModule {}
