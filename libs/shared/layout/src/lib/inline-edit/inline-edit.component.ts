import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { map } from 'rxjs/operators';

@Component({
  selector: 'formidable-inline-edit-button',
  template: `
    <div>
      <button
        class="flex flex-row whitespace-nowrap"
        (click)="startEditing()"
        @enterAnimation
        *ngIf="!editing"
      >
        <fa-icon class="mr-2" [icon]="icon"></fa-icon>
        add project
      </button>
      <div class="flex flex-row items-center" @enterAnimation *ngIf="editing">
        <input
          class="mr-2 bg-transparent"
          [placeholder]="placeholder"
          [formControl]="formControl"
          (keyup.enter)="onSave()"
          #inputElement
        />
        <button
          [class.text-indigo-100]="(hasValue$ | async) !== true"
          [class.text-indigo-600]="(hasValue$ | async) === true"
          (click)="onSave()"
          [disabled]="(hasValue$ | async) !== true"
        >
          <fa-icon [icon]="faCheck"></fa-icon>
        </button>
      </div>
    </div>
  `,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditComponent {
  @Input() icon!: IconProp;
  @Input() placeholder?: string | undefined = '';
  @Output() save = new EventEmitter();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  faCheck = faCheckCircle;
  editing = false;
  formControl = new FormControl();

  hasValue$ = this.formControl.valueChanges.pipe(
    map((value) => value?.length > 0)
  );

  startEditing() {
    this.editing = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  onSave() {
    this.save.emit(this.formControl.value);
    this.editing = false;
    this.formControl.reset();
  }
}
