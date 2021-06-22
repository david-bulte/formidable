import { Component, OnInit } from '@angular/core';
import { Type } from '@formidable/shared/builder';
import { FormidableItemService } from '../state/formidable-item.service';

@Component({
  selector: 'formidable-build-page',
  template: `
    <div class="flex justify-between h-screen">
      <div class="w-4/12 mr-8 mt-6">
        <formidable-palette></formidable-palette>
      </div>

      <div class="w-full mt-6 ">
        <formidable-canvas></formidable-canvas>
      </div>

      <div class="w-4/12 ml-4 mt-6">
        <formidable-properties></formidable-properties>
      </div>
    </div>
  `,
  styles: [],
})
export class BuildPageComponent implements OnInit {
  constructor(private formSchemeService: FormidableItemService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formSchemeService.add({type: Type.FORM, props: {}, parentId: null})
  }
}
