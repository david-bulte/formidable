import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuestionBase} from '../question-base';
import {TextboxQuestion} from '../questions/question-textbox';
import {OptionsComponent} from '../questions/options.component';
import {OptionsQuestion} from '../questions/question-options';
import {InputQuestion} from '../questions/question-input';


@Component({
  selector: 'app-edit-question',
  template: `
    <dynamic-form [questions]="questions" (save)="saveQuestions($event)"></dynamic-form>
  `
})
export class QuestionPropertiesComponent implements OnChanges {

  @Input() question: QuestionBase<any>;
  @Output() save = new EventEmitter<QuestionBase<any>>();

  questions: QuestionBase<any>[] = [];

  saveQuestions(props) {
    console.log('props', props);
    this.save.emit(Object.assign({}, this.question, props));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.questions = [
      new InputQuestion({
        key: 'label',
        label: 'Label'
      })
      // new TextboxQuestion({
      //   key: 'label',
      //   label: 'Label',
      //   value: '',
      //   required: true,
      //   order: 1
      // }),
    ];
    if (this.question) {
      switch (this.question.controlType) {
        case 'textbox':
          return;
        case 'dropdown':
          this.questions.push(
            new InputQuestion({
              key: 'options',
              label: 'Options'
            })
          // this.questions.push(
          //   new OptionsQuestion({
          //     key: 'options',
          //     label: 'Options'
          //   })
          );
      }
    }
  }

  onSubmit() {
    // this.save.emit(Object.assign({}, this.question, {label: this.questionForm.get('name').value}));
  }
}
