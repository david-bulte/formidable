import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromQuestion from './question.reducer';

// --- general ---
export interface State {
  questions: fromQuestion.State;
}

export const reducers: ActionReducerMap<State> = {
  questions: fromQuestion.reducer
};

// --- question specific ---

export const selectQuestionState = createFeatureSelector<fromQuestion.State>('questions');

export const {
  // select the array of user ids
  selectIds: selectQuestionIds,

  // select the dictionary of user entities
  selectEntities: selectQuestionEntities,

  // select the array of users
  selectAll: selectAllQuestions,

  // select the total user count
  selectTotal: selectUserTotal
} = fromQuestion.adapter.getSelectors(selectQuestionState);

export const selectCurrentQuestionId = createSelector(selectQuestionState, fromQuestion.getSelectedQuestionId);
export const selectCurrentQuestion = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (questionEntities, questionId) => questionEntities[questionId]
);
