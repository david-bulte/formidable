import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormidableItem, Type } from '@formidable/shared/renderer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { FormComponent } from '../../../../../shared/renderer/src/lib/form/form.component';
import { FormidableItemQuery } from '../state/formidable-item-query.service';
import { FormidableItemService } from '../state/formidable-item.service';

@UntilDestroy()
@Component({
  selector: 'formidable-properties',
  template: `
    <h1 class="mb-4 text-xl font-bold text-gray-700">Properties</h1>
    <div
      class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md overflow-y-auto properties-container"
    >
      <formidable-form
        [formDescription]="props$ | async"
        [value]="active$ | async"
        (submitForm)="onSubmitForm($event)"
      ></formidable-form>
    </div>
  `,
  styles: [
    `
      /*todo w/tailwind?*/
      .properties-container {
        min-height: 40vh;
        max-height: 80vh;
      }
    `,
  ],
})
export class PropertiesComponent {
  // todo
  active$ = this.formidableItemQuery.selectActive();
  props$ = this.formidableItemQuery.selectActiveFormDescription();

  constructor(
    private formidableItemQuery: FormidableItemQuery,
    private formidableItemService: FormidableItemService
  ) {}

  onSubmitForm(value) {
    this.formidableItemService.update(
      // todo props => group
      this.formidableItemQuery.getActiveId(),
      value
    );
  }
}
