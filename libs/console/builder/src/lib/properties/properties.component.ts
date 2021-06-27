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
    <div class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md">
      <formidable-form
        [item]="props$ | async"
        [value]="active$ | async"
        (submitForm)="onSubmitForm($event)"
      ></formidable-form>

      <!--        <div formGroupName="validation">-->
      <!--          <div class="mb-4">-->
      <!--            <label class="flex items-center">-->
      <!--              <input-->
      <!--                type="checkbox"-->
      <!--                class="form-checkbox"-->
      <!--                formControlName="required"-->
      <!--              />-->
      <!--              <span class="ml-2">required</span>-->
      <!--            </label>-->
      <!--          </div>-->

      <!--          <div class="mb-4">-->
      <!--            <label-->
      <!--              class="block text-gray-700 text-sm font-bold mb-2"-->
      <!--              for="custom"-->
      <!--            >-->
      <!--              custom-->
      <!--            </label>-->
      <!--            <textarea-->
      <!--              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"-->
      <!--              id="custom"-->
      <!--              [formControlName]="'custom'"-->
      <!--            ></textarea>-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        <button type="submit">submit</button>-->
      <!--      </form>-->
    </div>
  `,
  styles: [``],
})
export class PropertiesComponent {
  // todo
  active$ = this.formidableItemQuery.selectActive();
  props$ = this.formidableItemQuery.selectActivePropertyDescriptors();

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
