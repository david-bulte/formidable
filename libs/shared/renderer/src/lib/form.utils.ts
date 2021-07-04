import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormControl,
    FormGroup, ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { FormidableItem, Type } from '@formidable/shared/renderer';
import { Engine } from 'json-rules-engine';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

export function addControl(form: FormGroup | FormArray, item: FormidableItem) {
    let formControl, formGroup, formArray;
    switch (item.type) {
        case Type.FORM:
        case Type.ROW:
        case Type.COL:
            item.children.forEach((item) => {
                addControl(form, item);
            });
            break;
        case Type.GROUP:
            formGroup = new FormGroup(
                {},
                getValidators(item),
                getAsyncValidators(item)
            );
            isFormArray(form)
                ? form.push(formGroup)
                : form.addControl(item.props.name, formGroup);
            item.children.forEach((child) => {
                addControl(formGroup, child);
            });
            break;
        case Type.REPEAT:
            formArray = new FormArray(
                [],
                getValidators(item),
                getAsyncValidators(item)
            );
            isFormArray(form)
                ? form.push(formArray)
                : form.addControl(item.props.name, formArray);
            // repeat can only have root component (always a formgroup)
            addControl(formArray, item.children[0]);
            break;
        default:
            formControl = new FormControl(
                item.props.defaultValue,
                getValidators(item),
                getAsyncValidators(item)
            );
            isFormArray(form)
                ? form.push(formControl)
                : form.addControl(item.props.name, formControl);
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
