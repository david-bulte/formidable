import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormElement } from '../../model';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { addControl } from '../../form.utils';

@Component({
  selector: 'formidable-repeat',
  template: `
    <div>
      <formidable-label [formElement]='formElement'></formidable-label>

      <div [formGroup]='parent' class='rounded border p-2'>
        <div
          *ngFor='
            let control of fa.controls;
            let index = index;
            let first = first;
            let last = last
          '
        >
          <ng-container
            *ngFor='let child of formElement.children[0].children'
            formidableDynamicField
            [formElement]='child'
            [group]='control'
          >
          </ng-container>

          <div class='flex flex-row justify-end'>
            <button (click)='onMinus(index)' *ngIf='!first'>
              <fa-icon [icon]='minus'></fa-icon>
            </button>
            <button (click)='onPlus()' class='ml-2' *ngIf='last'>
              <fa-icon [icon]='plus'></fa-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RepeatComponent {
  @Input() parent: FormGroup;
  @Input() formElement: FormElement;

  plus = faPlusCircle;
  minus = faMinusCircle;

  get fa(): FormArray {
    return this.parent.get(this.formElement.props.name) as FormArray;
  }

  onPlus() {
    addControl(this.fa, this.formElement.children[0], null);
  }

  onMinus(index) {
    this.fa.removeAt(index);
  }
}
