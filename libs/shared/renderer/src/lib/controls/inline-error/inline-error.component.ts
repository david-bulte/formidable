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
      {{ parent.get(this.item.props.name)?.errors | firstError:this.item.props.name }}
    </div>
  `,
  styles: [],
})
export class InlineErrorComponent {
  @Input() parent: FormGroup;
  @Input() item: ControlItem;

  constructor() {}

}
