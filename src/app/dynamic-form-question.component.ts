import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from './question-base';

@Component({
  selector: 'df-question',
  template: `

    <div [formGroup]="form"  [class.selected]="selected">
      <!--<label [attr.for]="question.key" (click)="selectQuestion()">{{question.label}} {{question.id}}</label>-->
      <div (click)="selectQuestion()">

        <div [ngSwitch]="question.controlType">

          <!--<input *ngSwitchCase="'textbox'" [formControlName]="question.key"-->
          <!--[id]="question.key" [type]="question.type">-->

          <select [id]="question.key" *ngSwitchCase="'dropdown'" [formControlName]="question.key">
            <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
          </select>

          <app-custom-form-component *ngSwitchCase="'custom'"
                                     [question]="question"
                                     [form]="form"
                                     [formControlName]="question.key"></app-custom-form-component>

          <!--<ng-container *ngSwitchCase="'options'">-->
          <!--<add-banner [formControlName]="question.key"></add-banner>-->
          <!--</ng-container>-->

        </div>

      </div>

      <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
    </div>
  `,
  styles: [`
    div.selected {
      border: 1px dashed;
    }
  `]
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() selected = false;
  @Input() form: FormGroup;
  @Output() select = new EventEmitter<boolean>();

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  selectQuestion() {
    this.select.emit(true);
  }
}
