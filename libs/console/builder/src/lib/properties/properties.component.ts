import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormidableItemQuery } from '../state/formidable-item-query.service';
import { FormidableItemService } from '../state/formidable-item.service';

@UntilDestroy()
@Component({
  selector: 'formidable-properties',
  template: `
    <h1 class="mb-4 text-xl font-bold text-gray-700">Properties</h1>
    <div class="flex flex-col bg-white px-6 py-4 rounded-lg shadow-md">
      <form [formGroup]="properties" (ngSubmit)="onSubmit()">
        <div formGroupName="props">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="label"
            >
              label
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="label"
              type="text"
              [formControlName]="'label'"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              [formControlName]="'name'"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="classes"
            >
              classes
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="classes"
              type="text"
              [formControlName]="'classes'"
            />
          </div>
        </div>

        <div formGroupName="validation">
          <div class="mb-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="form-checkbox"
                formControlName="required"
              />
              <span class="ml-2">required</span>
            </label>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="custom"
            >
              custom
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="custom"
              [formControlName]="'custom'"
            ></textarea>
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  `,
  styles: [``],
})
export class PropertiesComponent implements OnInit {
  properties: FormGroup;

  active$ = this.formidableItemQuery.selectActive();

  constructor(
    private formidableItemQuery: FormidableItemQuery,
    private formidableItemService: FormidableItemService
  ) {}

  ngOnInit(): void {
    this.properties = new FormGroup({
      props: new FormGroup({
        label: new FormControl(),
        name: new FormControl(),
        classes: new FormControl()
      }),
      validation: new FormGroup({
        required: new FormControl(),
        custom: new FormControl(),
      }),
    });

    this.active$.pipe(untilDestroyed(this)).subscribe((item) => {
      this.properties.patchValue(item ?? {});
    });
  }

  onSubmit() {
    this.formidableItemService.update(
      this.formidableItemQuery.getActiveId(),
      this.properties.value
    );
  }
}
