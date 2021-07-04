import { Component } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
    template: `
        <formidable-control-base [formGroup]="parent">
            <select
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    [formControlName]="formControlName"
            >
                <option [value]="option.value" *ngFor="let option of item.props.options">
                    {{ option.label }}
                </option>
            </select>
        </formidable-control-base>
    `,
})
export class SelectComponent extends ControlBaseComponent {
}
