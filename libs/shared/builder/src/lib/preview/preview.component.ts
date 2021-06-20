import { Component, Input, OnInit } from '@angular/core';
import { FormItem } from '@formidable/shared/builder';

@Component({
  selector: 'formidable-preview',
  template: `
    <formidable-form [item]="item"></formidable-form> `,
  styles: [],
})
export class PreviewComponent implements OnInit {

  @Input() item: FormItem;

  constructor() {}

  ngOnInit(): void {
  }
}



// config: any = {
//   properties: {},
//   children: [
//     {
//       type: ControlType.ROW,
//       properties: {
//         classes: 'row bg-success d-flex', // row doesn't work?
//       },
//       children: [
//         {
//           type: ControlType.COL,
//           properties: {
//             classes: 'bg-warning col-6',
//           },
//         },
//         {
//           type: ControlType.INPUT,
//           properties: {
//             name: 'name',
//             label: 'Full name',
//             classes: 'bg-danger col-6',
//           },
//           // placeholder: 'Enter your name',
//           // validation: [Validators.required, Validators.minLength(4)]
//         },
//       ],
//     },
//     {
//       type: ControlType.ROW,
//       properties: {
//         classes: 'row bg-success d-flex', // row doesn't work?
//       },
//       children: [
//         {
//           type: ControlType.COL,
//           properties: {
//             classes: 'bg-primary col-6',
//           },
//         },
//         {
//           type: ControlType.INPUT,
//           properties: {
//             name: 'name',
//             label: 'Full name',
//             classes: 'bg-success col-6',
//           },
//           // placeholder: 'Enter your name',
//           // validation: [Validators.required, Validators.minLength(4)]
//         },
//       ],
//     },
//   ],
// };
