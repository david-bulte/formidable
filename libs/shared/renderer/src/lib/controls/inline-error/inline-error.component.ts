import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '../../model';
import { UntilDestroy } from '@ngneat/until-destroy';

// todo showFirst option?
// todo pipe
// todo OnPush - listen for parent.get(item.props.name).valueChanges
// todo ontouch/onblur/onsubmit/...
@UntilDestroy()
@Component({
  selector: 'formidable-inline-error',
  template: `
    <div [class.text-red-400]='parent.get(this.formElement.props.name).touched'>
      {{
      parent.get(this.formElement.props.name)?.errors
        | firstError: this.formElement.props.name
      }}
    </div>
  `,
  styles: [],
})
export class InlineErrorComponent {
  @Input() parent: FormGroup;
  @Input() formElement: FormElement;

  constructor() {}
}
