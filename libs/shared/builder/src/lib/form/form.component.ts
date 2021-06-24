import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
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
import { FormidableItem, FormItem, isFormItem, isLayoutItem, LayoutItem, } from '../model';

@Component({
    selector: 'formidable-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <ng-container
                    *ngFor="let child of item.children"
                    formidableDynamicField
                    [item]="child"
                    [group]="form"
            >
            </ng-container>

            <button
                    [disabled]="form.invalid"
                    class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                    type="submit"
            >
                Submit
            </button>
        </form>

        <div>value: {{ form.value | json }}</div>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class FormComponent implements OnInit {
    @Input() item: FormItem;

    form: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.form = this.createFormGroup(this.item);
    }

    getValidators(item: FormidableItem) {
        const validators: ValidatorFn[] = [];
        if (item.validation?.required) {
            validators.push(Validators.required);
        }
        return validators;
    }

    getAsyncValidators(item: FormidableItem) {
        const validators: AsyncValidatorFn[] = [];
        if (item.validation?.custom) {
            validators.push(this.getCustomValidator(item));
        }
        return validators;
    }

    getCustomValidator(item: FormidableItem): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const engine = new Engine();
            const rules = JSON.parse(item.validation.custom);
            const facts = {[item.props.name]: control.value};
            return fromPromise(engine.addRule(rules).run(facts)).pipe(map(({events}) => {
                const fail = !events.find(event => event.params.data === 'green')
                return fail ? {'custom-error': true} : null
            }));
        };
    }

    onSubmit() {
        console.log('submitting', this.form.value);
    }

    private createFormGroup(item: FormItem | LayoutItem) {
        const group = new FormGroup({});
        item.children.forEach((item) => this.addControl(group, item));
        return group;
    }

    private addControl(form: FormGroup, item: FormidableItem) {
        if (isFormItem(item) || isLayoutItem(item)) {
            item.children.forEach((item) => {
                this.addControl(form, item);
            });
        } else {
            // todo BUG
            // todo defaultValue
            const defaultValue = null;
            form.addControl(
                item.props.name,
                new FormControl(defaultValue, this.getValidators(item))
                // new FormControl(defaultValue, this.getValidators(item), this.getAsyncValidators(item))
            );
        }
    }
}
