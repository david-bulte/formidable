import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '@formidable/shared/renderer';
import { UntilDestroy } from '@ngneat/until-destroy';

// todo showFirst option?
// todo pipe
// todo OnPush - listen for parent.get(item.props.name).valueChanges
// todo ontouch/onblur/onsubmit/...
@UntilDestroy()
@Component({
  selector: 'formidable-inline-error',
  template: `
    <div [class.text-red-400]="parent.get(this.item.props.name).touched">
      {{ getFirstError(parent.get(this.item.props.name)?.errors) }}
    </div>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineErrorComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() item: ControlItem;

  // error$: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    // this.error$ = this.parent.get(this.item.props.name).statusChanges.pipe(
    //   distinctUntilChanged(),
    //   map(() =>
    //     this.getFirstError(this.parent.get(this.item.props.name).errors)
    //   ),
    //   filterNil,
    //   untilDestroyed(this)
    // );
  }

  getFirstError(errors: { [errorName: string]: boolean | any }) {
    if (!errors) {
      return null;
    }

    const firstError = Object.entries(errors).find(
      (entry) => entry[1] !== false
    );

    return firstError ? this.item.props.name + '.' + firstError[0] : undefined;
  }
}
