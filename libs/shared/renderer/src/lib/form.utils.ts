import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormidableItem, Type } from '@formidable/shared/renderer';
import { Engine } from 'json-rules-engine';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

export function addControl(
  form: FormGroup | FormArray,
  controlItem: FormidableItem,
  formValue: any
) {
  let formControl, formGroup, formArray, options;
  switch (controlItem.type) {
    case Type.FORM:
    case Type.ROW:
    case Type.COL:
      // handle children
      controlItem.children.forEach((item) => {
        addControl(form, item, formValue);
      });
      break;
    case Type.GROUP:
      // create AbstractFormControl
      formGroup = new FormGroup(
        {},
        getValidators(controlItem),
        getAsyncValidators(controlItem)
      );
      // add to parent control
      isFormArray(form)
        ? form.push(formGroup)
        : form.addControl(controlItem.props.name, formGroup);
      // handle children
      controlItem.children.forEach((child) => {
        addControl(
          formGroup,
          child,
          isFormArray(form) ? formValue : formValue?.[controlItem.props.name]
        );
      });
      break;
    case Type.REPEAT:
      // create AbstractFormControl
      formArray = new FormArray(
        [],
        getValidators(controlItem),
        getAsyncValidators(controlItem)
      );
      // add to parent control
      isFormArray(form)
        ? form.push(formArray)
        : form.addControl(controlItem.props.name, formArray);
      // handle children
      options = formValue[controlItem.props.name];
      if (options?.length > 0) {
        options.forEach((option) => {
          addControl(formArray, controlItem.children[0], option);
        });
      } else {
        addControl(formArray, controlItem.children[0], null);
      }
      break;
    default:
      // create AbstractFormControl
      formControl = new FormControl(
        formValue?.[controlItem.props.name] || controlItem.props.defaultValue,
        getValidators(controlItem),
        getAsyncValidators(controlItem)
      );
      // add to parent control
      isFormArray(form)
        ? form.push(formControl)
        : form.addControl(controlItem.props.name, formControl);
  }
}

function isFormArray(obj): obj is FormArray {
  return obj['push'] !== undefined;
}

function getValidators(item: FormidableItem) {
  const validators: ValidatorFn[] = [];

  if (item.validation?.required === true) {
    validators.push(Validators.required);
  }
  if (item.validation?.min !== undefined) {
    validators.push(Validators.min(item.validation?.min));
  }
  if (item.validation?.max !== undefined) {
    validators.push(Validators.max(item.validation?.max));
  }
  return validators;
}

function getAsyncValidators(item: FormidableItem) {
  const validators: AsyncValidatorFn[] = [];
  if (item.validation?.custom) {
    validators.push(getCustomValidator(item));
  }
  return validators;
}

function getCustomValidator(item: FormidableItem): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const engine = new Engine();
    const rules = JSON.parse(item.validation.custom);
    const facts = { [item.props.name]: control.value };
    return fromPromise(engine.addRule(rules).run(facts)).pipe(
      map(({ events }) => {
        const fail = !events.find((event) => event.params.data === 'green');
        return fail ? { 'custom-error': true } : null;
      })
    );
  };
}
