import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { FormElementService } from '../state/form-element.service';
import { Project } from '../state/project.model';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'formidable-projects',
  template: `
    <h1 class="mb-4">Projects</h1>
    <ul>
      <li *ngFor="let comp of projects">
        <a [routerLink]="comp.id" [routerLinkActive]="'text-indigo-600'">{{
          comp.name
        }}</a>
      </li>
      <li>
        <formidable-inline-edit-button
          [icon]="faPlus"
          [placeholder]="'enter project name'"
          (save)="onSave($event)"
        ></formidable-inline-edit-button>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
  @Output() create = new EventEmitter();

  faPlus = faPlusSquare;

  onSave(projectName: string) {
    this.create.emit(projectName);
  }
}
