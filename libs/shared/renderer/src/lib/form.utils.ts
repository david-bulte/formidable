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
import { Engine } from 'json-rules-engine';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import {
  FormElement,
  isGroup,
  isParent,
  isRepeat,
  isValidatable,
  Validatable,
} from './model';

export function addControl(
  form: FormGroup | FormArray,
  formElement: FormElement,
  formValue: any
) {
  // let formControl, formGroup, formArray, options;

  if (isGroup(formElement)) {
    // create AbstractFormControl
    const formGroup = new FormGroup(
      {},
      getValidators(formElement),
      getAsyncValidators(formElement)
    );

    // add to parent control
    isFormArray(form)
      ? form.push(formGroup)
      : form.addControl(formElement.props.name, formGroup);
    // handle children
    formElement.children?.forEach((child) => {
      addControl(
        formGroup,
        child,
        isFormArray(form) ? formValue : formValue?.[formElement.props.name]
      );
    });
    return;
  }

  if (isRepeat(formElement)) {
    // create AbstractFormControl
    const formArray = new FormArray(
      [],
      getValidators(formElement),
      getAsyncValidators(formElement)
    );
    // add to parent control
    isFormArray(form)
      ? form.push(formArray)
      : form.addControl(formElement.props.name, formArray);

    // handle children
    const options = formValue[formElement.props.name];
    if (options?.length > 0) {
      options.forEach((option: { label: string; value: string }) => {
        addControl(formArray, formElement.children[0], option);
      });
    } else {
      addControl(formArray, formElement.children[0], null);
    }
    return;
  }

  if (isParent(formElement)) {
    // handle children
    formElement.children?.forEach((element) => {
      addControl(form, element, formValue);
    });
    return;
  }

  // create AbstractFormControl
  const formControl = new FormControl(
    formValue?.[formElement.props.name] || formElement.props.defaultValue,
    getValidators(formElement),
    getAsyncValidators(formElement)
  );

  // add to parent control
  isFormArray(form)
    ? form.push(formControl)
    : form.addControl(formElement.props.name, formControl);

  // switch (formElement.type) {
  // case FormElementType.FORM:
  // case FormElementType.ROW:
  // case FormElementType.COL:
  //   // handle children
  //   formElement.children.forEach((element) => {
  //     addControl(form, element, formValue);
  //   });
  //   break;

  // case FormElementType.GROUP:
  //   // create AbstractFormControl
  //   formGroup = new FormGroup(
  //     {},
  //     getValidators(formElement),
  //     getAsyncValidators(formElement)
  //   );
  //   // add to parent control
  //   isFormArray(form)
  //     ? form.push(formGroup)
  //     : form.addControl(formElement.props.name, formGroup);
  //   // handle children
  //   formElement.children.forEach((child) => {
  //     addControl(
  //       formGroup,
  //       child,
  //       isFormArray(form) ? formValue : formValue?.[formElement.props.name]
  //     );
  //   });
  //   break;

  // case FormElementType.REPEAT:
  //   // create AbstractFormControl
  //   formArray = new FormArray(
  //     [],
  //     getValidators(formElement),
  //     getAsyncValidators(formElement)
  //   );
  //   // add to parent control
  //   isFormArray(form)
  //     ? form.push(formArray)
  //     : form.addControl(formElement.props.name, formArray);
  //   // handle children
  //   options = formValue[formElement.props.name];
  //   if (options?.length > 0) {
  //     options.forEach((option) => {
  //       addControl(formArray, formElement.children[0], option);
  //     });
  //   } else {
  //     addControl(formArray, formElement.children[0], null);
  //   }
  //   break;

  // default:
  // // create AbstractFormControl
  // formControl = new FormControl(
  //   formValue?.[formElement.props.name] || formElement.props.defaultValue,
  //   getValidators(formElement),
  //   getAsyncValidators(formElement)
  // );
  // // add to parent control
  // isFormArray(form)
  //   ? form.push(formControl)
  //   : form.addControl(formElement.props.name, formControl);
  // }
}

function isFormArray(obj): obj is FormArray {
  return obj['push'] !== undefined;
}

function getValidators(formElement: FormElement) {
  const validators: ValidatorFn[] = [];

  if (isValidatable(formElement)) {
    if (formElement.validation?.required === true) {
      validators.push(Validators.required);
    }
    if (formElement.validation?.min !== undefined) {
      validators.push(Validators.min(formElement.validation?.min));
    }
    if (formElement.validation?.max !== undefined) {
      validators.push(Validators.max(formElement.validation?.max));
    }
  }

  return validators;
}

function getAsyncValidators(formElement: FormElement) {
  const validators: AsyncValidatorFn[] = [];
  if (isValidatable(formElement)) {
    if (formElement.validation?.custom) {
      validators.push(getCustomValidator(formElement));
    }
  }
  return validators;
}

function getCustomValidator(formElement: Validatable): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const engine = new Engine();
    const rules = JSON.parse(formElement.validation.custom);
    const facts = { [formElement.props.name]: control.value };
    return fromPromise(engine.addRule(rules).run(facts)).pipe(
      map(({ events }) => {
        const fail = !events.find((event) => event.params.data === 'green');
        return fail ? { 'custom-error': true } : null;
      })
    );
  };
}
