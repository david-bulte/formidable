import { Component, Input } from '@angular/core';
import { Project } from '../state/project.model';

@Component({
  selector: 'formidable-projects',
  template: `
    <h1 class="mb-4">Projects</h1>
    <ul>
      <li *ngFor="let comp of projects">
        <a [routerLink]="comp.id" [routerLinkActive]="'text-indigo-600'">{{ comp.name }}</a>
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
  @Input() projects: Project[];
}
