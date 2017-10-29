import {Action} from '@ngrx/store';
import {QuestionBase} from '../question-base';

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const SELECT_QUESTION = 'SELECT_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';

export class AddQuestion implements Action {
  readonly type = ADD_QUESTION;

  constructor(public payload: {question: QuestionBase<any>}) {}
}

export class AddQuestionSuccess implements Action {
  readonly type = ADD_QUESTION_SUCCESS;

  constructor(public payload: {question: QuestionBase<any>}) {}
}

export class SelectQuestion implements Action {
  readonly type = SELECT_QUESTION;

  constructor(public payload: {id: number}) {}
}

export class UpdateQuestion implements Action {
  readonly type = UPDATE_QUESTION;

  constructor(public payload: {question: {id: number, changes: QuestionBase<any>}}) {}
}

export type All
  = AddQuestion
  | AddQuestionSuccess
  | SelectQuestion
  | UpdateQuestion;
