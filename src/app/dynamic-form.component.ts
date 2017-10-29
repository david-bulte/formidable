import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from './question-base';
import {QuestionControlService} from './question-control.service';

@Component({
  selector: 'dynamic-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
        
        <div *ngFor="let question of questions" class="form-row">
          question = {{question?.id}}
          <df-question [question]="question" [form]="form" 
                       [selected]="question.id === selected?.id"
                       (select)="selectQuestion(question)"></df-question>
        </div>

        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>

      <div *ngIf="payLoad" class="form-row">
        <strong>Saved the following values</strong><br>{{payLoad}}
      </div>
    </div>
  `,
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnChanges {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() selected: QuestionBase<any>;

  @Output() save = new EventEmitter<any>();
  @Output() select = new EventEmitter<QuestionBase<any>>();
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnChanges() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.save.emit(this.form.value);
  }

  selectQuestion(question) {
    this.select.emit(question);
  }

}
