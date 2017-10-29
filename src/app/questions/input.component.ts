import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionBase} from '../question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `

    <div>
      <!--<label [attr.for]="question.key">{{question.label}}</label>-->
      <label >{{question.label}}</label>

      <div [formGroup]="form" *ngIf="form">
        <input [id]="question.key" [type]="'text'" [formControlName]="question.key" (change)="changeInput()">
      </div>
    </div>

  `
})
export class InputComponent {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  @Output() change = new EventEmitter<any>();

  changeInput() {
    this.change.emit(this.form.get(this.question.key).value);
  }


}
