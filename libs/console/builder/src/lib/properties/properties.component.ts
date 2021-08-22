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
        <ng-template formidableTabTitle>test</ng-template>
        <ng-template formidableTabContent>nog een test</ng-template>
      </formidable-tab>
    </formidable-tabs>

    <!--    <div class="flex flex-col">-->
    <!--      <h1 class="title">Properties</h1>-->
    <!--      <div class="card h-full overflow-y-auto">-->
    <!--        <formidable-form-->
    <!--          [formElement]="props$ | async"-->
    <!--          [value]="active$ | async"-->
    <!--          (submitForm)="onSubmitForm($event)"-->
    <!--        ></formidable-form>-->
    <!--      </div>-->
    <!--    </div>-->
  `,
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
