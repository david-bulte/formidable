// ./effects/auth.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/observable/of';
import {AddQuestion, AddQuestionSuccess} from './question.actions';

@Injectable()
export class QuestionEffects {

  counter = 0;

  @Effect() add$: Observable<Action> = this.actions$
    .ofType<AddQuestion>('ADD_QUESTION')
    .mergeMap(action =>
      Observable.of(new AddQuestionSuccess({question: Object.assign({}, action.payload.question, {id: this.counter++})}))
    );

  constructor(private actions$: Actions) {
  }
}
