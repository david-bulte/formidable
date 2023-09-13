import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormElementQuery } from '../state/form-element-query.service';
import { FormElementService } from '../state/form-element.service';

@UntilDestroy()
@Component({
  selector: 'formidable-properties',
  template: `
    <formidable-tabs>
      <formidable-tab>
        <ng-template formidableTabTitle> Properties</ng-template>
        <ng-template formidableTabContent>
          <formidable-form
            [formElement]="props$ | async"
            [value]="active$ | async"
            (submitForm)="onSubmitForm($event)"
          ></formidable-form>
        </ng-template>
      </formidable-tab>

      <formidable-tab>
        <ng-template formidableTabTitle>json (debug)</ng-template>
        <ng-template formidableTabContent>
          <pre>{{ debug$ | async | json }}</pre>
        </ng-template>
      </formidable-tab>
    </formidable-tabs>
  `,
  styles: [
    `
        :host {
            display: flex;
            flex: 1;
            overflow-y: hidden;
        }
    `
  ]
})
export class PropertiesComponent {
  active$ = this.formElementQuery.selectActive();
  props$ = this.formElementQuery.selectActiveFormDescription();
  debug$ = this.formElementQuery.selectProject();

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
