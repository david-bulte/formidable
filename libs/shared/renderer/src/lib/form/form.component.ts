import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Engine } from 'json-rules-engine';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import { FormidableItem, FormItem, LayoutItem, Type } from '../model';

@UntilDestroy()
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
        *ngIf="!autosubmit"
        [disabled]="form.invalid"
        class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        type="submit"
      >
        Submit
      </button>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FormComponent implements OnChanges {
  @Input() item: FormItem;
  @Input() value: FormidableItem;
  @Output() submitForm = new EventEmitter();

  form: FormGroup;

  constructor() {}

  get autosubmit() {
    return this.item?.props?.autosubmit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
    if (change) {
      this.form = this.createFormGroup(this.item);
      if (this.autosubmit) {
        this.form.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe(($event) => {
            this.submitForm.emit(this.form.value);
          });
      }
    }

    change = changes['value'];
    // todo
    if (change && this.value && this.value.type !== Type.FORM) {
      this.form.patchValue(this.value, { emitEvent: false });
    }
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
      const facts = { [item.props.name]: control.value };
      return fromPromise(engine.addRule(rules).run(facts)).pipe(
        map(({ events }) => {
          const fail = !events.find((event) => event.params.data === 'green');
          return fail ? { 'custom-error': true } : null;
        })
      );
    };
  }

  onSubmit() {
    if (!this.autosubmit) {
      this.submitForm.emit(this.form.value);
    }
  }

  private createFormGroup(item: FormItem | LayoutItem) {
    const group = new FormGroup({});
    item.children.forEach((item) => this.addControl(group, item));
    return group;
  }

  private addControl(form: FormGroup, item: FormidableItem) {
    let formGroup;
    switch (item.type) {
      case Type.FORM:
      case Type.ROW:
      case Type.COL:
        item.children.forEach((item) => {
          this.addControl(form, item);
        });
        break;
      case Type.GROUP:
        formGroup = new FormGroup(
          {},
          this.getValidators(item),
          this.getAsyncValidators(item)
        );
        form.addControl(item.props.name, formGroup);
        item.children.forEach((child) => {
          this.addControl(formGroup, child);
        });
        break;
      default:
        form.addControl(
          item.props.name,
          new FormControl(
            item.props.defaultValue,
            this.getValidators(item),
            this.getAsyncValidators(item)
          )
        );
    }
  }
}
