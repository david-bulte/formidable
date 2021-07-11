import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormElementQuery } from '../state/form-element-query.service';
import { FormElementService } from '../state/form-element.service';

@UntilDestroy()
@Component({
  selector: 'formidable-properties',
  template: `
    <h1 class='mb-4 text-xl font-bold text-gray-700'>Properties</h1>
    <div
      class='flex flex-col bg-white px-6 py-4 rounded-lg shadow-md overflow-y-auto properties-container'
    >
      <formidable-form
        [formElement]='props$ | async'
        [value]='active$ | async'
        (submitForm)='onSubmitForm($event)'
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
  active$ = this.formElementQuery.selectActive();
  props$ = this.formElementQuery.selectActiveFormDescription();

  constructor(
    private formElementQuery: FormElementQuery,
    private formElementService: FormElementService
  ) {}

  onSubmitForm(value) {
    this.formElementService.update(
      // todo props => group
      this.formElementQuery.getActiveId(),
      value
    );
  }
}
