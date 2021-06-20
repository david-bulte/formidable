import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormSchemeQuery } from '../../../../../console/builder/src/lib/state/form-scheme.query';
import { PaletteItemService } from '../../../../../console/builder/src/lib/state/palette-item.service';
import { PalettteItemQuery } from '../../../../../console/builder/src/lib/state/palettte-item.query';
import { ControlType, FormConfig } from '../model';

@Component({
  selector: 'formidable-preview',
  template: `
    <formidable-form [item]="config"></formidable-form> `,
  styles: [],
})
export class PreviewComponent implements OnInit {
  // config: FormConfig = {
  config: any = {
    properties: {},
    children: [
      {
        type: ControlType.ROW,
        properties: {
          classes: 'row bg-success d-flex', // row doesn't work?
        },
        children: [
          {
            type: ControlType.COL,
            properties: {
              classes: 'bg-warning col-6',
            },
          },
          {
            type: ControlType.INPUT,
            properties: {
              name: 'name',
              label: 'Full name',
              classes: 'bg-danger col-6',
            },
            // placeholder: 'Enter your name',
            // validation: [Validators.required, Validators.minLength(4)]
          },
        ],
      },
      {
        type: ControlType.ROW,
        properties: {
          classes: 'row bg-success d-flex', // row doesn't work?
        },
        children: [
          {
            type: ControlType.COL,
            properties: {
              classes: 'bg-primary col-6',
            },
          },
          {
            type: ControlType.INPUT,
            properties: {
              name: 'name',
              label: 'Full name',
              classes: 'bg-success col-6',
            },
            // placeholder: 'Enter your name',
            // validation: [Validators.required, Validators.minLength(4)]
          },
        ],
      },
    ],
  };

  constructor(
    private formSchemeQuery: FormSchemeQuery,
  ) {}

  ngOnInit(): void {
    this.config = this.formSchemeQuery.getAllAsTree();
    console.log("this.config", this.config);

    // this.formSchemeQuery
    //   .selectAll()
    //   .pipe(
    //     map((items) => {
    //       return {
    //         properties: {},
    //         children: items,
    //       };
    //     })
    //   )
    //   .subscribe((config) => {
    //     this.config = config;
    //   });
  }
}
