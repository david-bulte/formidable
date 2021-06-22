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
      <!--      todo -->

      {{ (active$ | async)?.type }} | {{ (active$ | async)?.id }}

      <form [formGroup]="properties" (ngSubmit)="onSubmit()">
        
        <div formGroupName="props">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="label">
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
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              [formControlName]="'name'"
            />
          </div>
        </div>

        <div formGroupName="validation">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              formControlName="required"
            />
            <span class="ml-2">required</span>
          </label>
        </div>

        <button type="submit">submit</button>
      </form>

      <!--      <ul class="-mx-4">-->
      <!--        <li class="flex items-center">-->
      <!--          <img-->
      <!--            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"-->
      <!--            alt="avatar"-->
      <!--            class="w-10 h-10 object-cover rounded-full mx-4"-->
      <!--          />-->
      <!--          <p>-->
      <!--            <a href="#" class="text-gray-700 font-bold mx-1 hover:underline"-->
      <!--              >Alex John</a-->
      <!--            ><span class="text-gray-700 text-sm font-light"-->
      <!--              >Created 23 Posts</span-->
      <!--            >-->
      <!--          </p>-->
      <!--        </li>-->
      <!--        <li class="flex items-center mt-6">-->
      <!--          <img-->
      <!--            src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"-->
      <!--            alt="avatar"-->
      <!--            class="w-10 h-10 object-cover rounded-full mx-4"-->
      <!--          />-->
      <!--          <p>-->
      <!--            <a href="#" class="text-gray-700 font-bold mx-1 hover:underline"-->
      <!--              >Jane Doe</a-->
      <!--            ><span class="text-gray-700 text-sm font-light"-->
      <!--              >Created 52 Posts</span-->
      <!--            >-->
      <!--          </p>-->
      <!--        </li>-->
      <!--        <li class="flex items-center mt-6">-->
      <!--          <img-->
      <!--            src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"-->
      <!--            alt="avatar"-->
      <!--            class="w-10 h-10 object-cover rounded-full mx-4"-->
      <!--          />-->
      <!--          <p>-->
      <!--            <a href="#" class="text-gray-700 font-bold mx-1 hover:underline"-->
      <!--              >Lisa Way</a-->
      <!--            ><span class="text-gray-700 text-sm font-light"-->
      <!--              >Created 73 Posts</span-->
      <!--            >-->
      <!--          </p>-->
      <!--        </li>-->
      <!--        <li class="flex items-center mt-6">-->
      <!--          <img-->
      <!--            src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"-->
      <!--            alt="avatar"-->
      <!--            class="w-10 h-10 object-cover rounded-full mx-4"-->
      <!--          />-->
      <!--          <p>-->
      <!--            <a href="#" class="text-gray-700 font-bold mx-1 hover:underline"-->
      <!--              >Steve Matt</a-->
      <!--            ><span class="text-gray-700 text-sm font-light"-->
      <!--              >Created 245 Posts</span-->
      <!--            >-->
      <!--          </p>-->
      <!--        </li>-->
      <!--        <li class="flex items-center mt-6">-->
      <!--          <img-->
      <!--            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"-->
      <!--            alt="avatar"-->
      <!--            class="w-10 h-10 object-cover rounded-full mx-4"-->
      <!--          />-->
      <!--          <p>-->
      <!--            <a href="#" class="text-gray-700 font-bold mx-1 hover:underline"-->
      <!--              >Khatab Wedaa</a-->
      <!--            ><span class="text-gray-700 text-sm font-light"-->
      <!--              >Created 332 Posts</span-->
      <!--            >-->
      <!--          </p>-->
      <!--        </li>-->
      <!--      </ul>-->
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
      }),
      validation: new FormGroup({
        required: new FormControl()
      })
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
