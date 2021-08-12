import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { map } from 'rxjs/operators';
import { FormElementService } from '../state/form-element.service';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'formidable-empty-state',
  template: `
    <div
      class="flex justify-between w-full h-4/6 mx-auto my-auto bg-transparent left-0 empty-state__container"
    >
      <div class="mx-auto my-auto flex flex-col items-center w-6/12">
        <div
          class="flex flex-row items-center"
          @enterAnimation
          *ngIf="!started"
        >
          <h1 class="text-3xl">It's quiet here...</h1>
          <button class="btn-primary text-3xl" (click)="start()">
            Shake it up?
          </button>
        </div>

        <div class="flex flex-row items-center" @enterAnimation *ngIf="started">
          <h1 class="text-3xl mr-2">Enter form name</h1>
          <input
            class="text-3xl mr-2"
            [formControl]="formControl"
            (keyup.enter)="onCreate()"
            #inputElement
          />
          <button
            class="text-4xl"
            [class.text-indigo-100]="(valid$ | async) !== true"
            [class.text-indigo-600]="(valid$ | async) === true"
            (click)="onCreate()"
            [disabled]="(valid$ | async) !== true"
          >
            <fa-icon [icon]="check"></fa-icon>
          </button>
        </div>
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
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      button {
        height: 3rem;
      }

      input {
        background-color: transparent;
        box-shadow: none;
        font-weight: 600;
        width: 20rem;
        --tw-text-opacity: 1;
        color: rgba(55, 65, 81, var(--tw-text-opacity));
      }

      .empty-state__container > div > div {
        margin-left: -10rem;
      }
      
    `,
  ],
})
export class EmptyStateComponent {
  @ViewChildren('inputElement') inputElement: QueryList<ElementRef>;

  started = false;
  formControl = new FormControl();
  valid$ = this.formControl.valueChanges.pipe(
    map((value) => value?.length > 0)
  );

  check = faCheckCircle;

  constructor(
    private projectService: ProjectService,
    private formElementService: FormElementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  start() {
    this.started = true;
    setTimeout(() => {
      this.inputElement?.get(0)?.nativeElement.focus();
    });
  }

  onCreate(name: string) {
    const project = this.projectService.add({
      name: this.formControl.value,
    });
    this.formElementService.createForm(name, project.id);
    this.router.navigate([project.id], {relativeTo: this.route});
  }
}
