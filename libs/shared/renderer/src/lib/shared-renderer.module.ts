import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TippyModule } from '@ngneat/helipopper';
import { ControlBaseTemplateComponent } from './controls/control-base/control-base-template.component';
import { InputComponent } from './controls/input/input.component';
import { LayoutComponent } from './controls/layout/layout.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { FormComponent } from './form/form.component';
import { PreviewComponent } from './preview/preview.component';
import { NumberComponent } from './controls/number/number.component';
import { GroupComponent } from './controls/group/group.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { TextareaComponent } from './controls/textarea/textarea.component';
import { LabelComponent } from './controls/label/label.component';
import { InlineErrorComponent } from './controls/inline-error/inline-error.component';
import { FirstErrorPipe } from './controls/inline-error/first-error.pipe';
import { RepeatComponent } from './controls/repeat/repeat.component';
import { SelectComponent } from './controls/select/select.component';

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
    LabelComponent,
    InlineErrorComponent,
    FirstErrorPipe,
    ControlBaseTemplateComponent,
    RepeatComponent,
    SelectComponent,
  ],
  exports: [PreviewComponent, FormComponent],
})
export class SharedRendererModule {}
