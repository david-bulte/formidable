import {Component} from '@angular/core';
import {QuestionBase} from './question-base';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AddQuestion, SelectQuestion, UpdateQuestion} from './reducers/question.actions';

import * as fromQuestion from './reducers';
import {TextboxQuestion} from './questions/question-textbox';
import {DropdownQuestion} from './questions/question-dropdown';
import {InputQuestion} from './questions/question-input';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <!--<form class="form-inline my-2 my-lg-0">-->
        <!--<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">-->
        <!--<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
        <!--</form>-->
      </div>
    </nav>

    <main class="container">
      <div class="row">
        <div class="col-sm">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action active" (click)="addTextbox()">
              textbox
            </a>
            <a href="#" class="list-group-item list-group-item-action" (click)="addDropdown()">
              select
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              section
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              page
            </a>
            <a href="#" class="list-group-item list-group-item-action disabled">
              checkbox
            </a>
          </div>
        </div>
        <div class="col-sm">
          <dynamic-form [questions]="questions$ | async" (select)="selectQuestion($event)"
                        [selected]="selected$ | async"></dynamic-form>
        </div>
        <div class="col-sm">
          <app-edit-question [question]="selected$ | async" (save)="saveQuestion($event)"></app-edit-question>
        </div>
      </div>
    </main>
  `
})
export class AppComponent {

  questions$: Observable<QuestionBase<any>[]>;
  selected$: Observable<QuestionBase<any>>;

  constructor(private store: Store<any>) {
    this.questions$ = store.select(fromQuestion.selectAllQuestions);
    this.selected$ = store.select(fromQuestion.selectCurrentQuestion);
  }

  addTextbox() {
    this.store.dispatch(new AddQuestion({
      question: new InputQuestion({
        key: 'placeholder',
        label: 'placeholder',
        value: 'placeholder',
        required: false,
        order: 1
      })
      // question: new TextboxQuestion({
      //   key: 'placeholder',
      //   label: 'placeholder',
      //   value: 'placeholder',
      //   required: false,
      //   order: 1
      // })
    }));
  }

  addDropdown() {
    this.store.dispatch(new AddQuestion({
      question: new DropdownQuestion({
        key: 'placeholder',
        label: 'placeholder',
        value: 'placeholder',
        required: false,
        order: 1
      })
    }));
  }

  selectQuestion(question: QuestionBase<any>) {
    console.log('+++' + question.id);
    this.store.dispatch(new SelectQuestion({id: question.id}));
  }

  saveQuestion(question: QuestionBase<any>) {
    this.store.dispatch(new UpdateQuestion({question: {id: question.id, changes: question}}));
  }
}
