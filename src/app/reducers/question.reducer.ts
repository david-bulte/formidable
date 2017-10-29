import * as QuestionActions from './question.actions';
import {ADD_QUESTION, ADD_QUESTION_SUCCESS, SELECT_QUESTION, UPDATE_QUESTION} from './question.actions';

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QuestionBase} from '../question-base';
import {DropdownQuestion} from '../questions/question-dropdown';
import {TextboxQuestion} from '../questions/question-textbox';

export interface State extends EntityState<QuestionBase<any>> {
  // additional entities state properties
  selectedQuestionId: number;
}

// export function sortByName(a: User, b: User): number {
//   return a.name.localeCompare(b.name);
// }

export const adapter: EntityAdapter<QuestionBase<any>> = createEntityAdapter<QuestionBase<any>>({
  // sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: {},
  // additional entity state properties
  selectedQuestionId: null
});

export type Action = QuestionActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {
    case ADD_QUESTION_SUCCESS:
      return adapter.addOne(action.payload.question, state);

    case SELECT_QUESTION:
      return Object.assign({}, state, {selectedQuestionId: action.payload.id});

    case UPDATE_QUESTION:
      return adapter.updateOne(action.payload.question, state);

    default:
      return state;
  }

}

export const getSelectedQuestionId = (state: State) => state.selectedQuestionId;

// let questions: QuestionBase<any>[] = [
//
//   new DropdownQuestion({
//     key: 'brave',
//     label: 'Bravery Rating',
//     options: [
//       {key: 'solid', value: 'Solid'},
//       {key: 'great', value: 'Great'},
//       {key: 'good', value: 'Good'},
//       {key: 'unproven', value: 'Unproven'}
//     ],
//     order: 3
//   }),
//
//   new TextboxQuestion({
//     key: 'firstName',
//     label: 'First name',
//     value: 'Bombasto',
//     required: true,
//     order: 1
//   }),
//
//   new TextboxQuestion({
//     key: 'emailAddress',
//     label: 'Email',
//     type: 'email',
//     order: 2
//   })
// ];

