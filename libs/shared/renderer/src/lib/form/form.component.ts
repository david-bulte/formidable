import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { addControl } from '../form.utils';
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
    
    <h1>result</h1>
    <pre>
      {{form.value | json}}
    </pre>
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

  get autosubmit() {
    return this.item?.props?.autosubmit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
    if (change) {
      // todo set value while creating so we can deal with e.g. dynamically added controls
      this.form = this.createFormGroup(this.item);
      if (this.autosubmit) {
        this.form.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe(($event) => {
            this.submitForm.emit(this.form.value);
          });
      }
    }


    // todo dynamic stuff
    // for (let i = 0; i < value?.[item.props.name]?.length ?? 0; i++) {
    //   addControl(formArray, item.children[0], value);
    // }
    // addControl(formArray, item.children[0], value);

    change = changes['value'];

    // todo
    if (change && this.value && this.value.type !== Type.FORM && change.previousValue?.id !== change.currentValue?.id) {
      console.log("this.value", this.value);
      this.form.reset(this.value, { emitEvent: false });
    }
  }

  onSubmit() {
    if (!this.autosubmit) {
      this.submitForm.emit(this.form.value);
    }
  }

  private createFormGroup(item: FormItem | LayoutItem) {
    const group = new FormGroup({});
    item.children.forEach((item) => addControl(group, item));
    return group;
  }
}
