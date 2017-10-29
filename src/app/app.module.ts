import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';
import {StoreModule} from '@ngrx/store';
import * as question from './reducers';
import {QuestionPropertiesComponent} from './properties/question-properties.component';
import {EffectsModule} from '@ngrx/effects';
import {QuestionEffects} from './reducers/question.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {OptionsComponent} from './questions/options.component';
import {InputComponent} from './questions/input.component';
import {CustomFormComponent} from './properties/custom-form.component';
import {CustomFormDirective} from './properties/custom-form.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    QuestionPropertiesComponent,
    CustomFormDirective,
    CustomFormComponent,
    OptionsComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(question.reducers),
    EffectsModule.forRoot([QuestionEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    ReactiveFormsModule
  ],
  entryComponents: [
    InputComponent,
    OptionsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
