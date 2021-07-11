import { Component, OnInit } from '@angular/core';
import { FormElementService } from '../state/form-element.service';

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
  constructor(private formSchemeService: FormElementService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    // todo first ask in popup
    this.formSchemeService.createForm();
  }
}
