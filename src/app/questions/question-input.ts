import {QuestionBase} from '../question-base';
import {InputComponent} from './input.component';

export class InputQuestion extends QuestionBase<string> {
  controlType = 'custom';
  component = InputComponent;
}
