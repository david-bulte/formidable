import { Component } from '@angular/core';
import { FormElementService } from '../state/form-element.service';
import { ProjectQuery } from '../state/project-query.service';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'formidable-build-page',
  template: `
    <button
      class="btn-primary"
      *teleportTo="'navButton'"
      (click)="onCreate('dummy')"
    >
      create project
    </button>

    <div class="overflow-y-hidden flex flex-row h-full">

      <nav class="flex flex-col mx-6">
        <div class="mt-6 ml-2">
          <formidable-projects
            [projects]="projects$ | async"
          ></formidable-projects>
        </div>
      </nav>

      <div class="w-full">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
  .nav {
      width: 10rem;
  }
  
  `],
})
export class BuildPageComponent {
  projects$ = this.projectQuery.selectAll();

  constructor(
    private formElementService: FormElementService,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery
  ) {}

  onCreate(name: string) {
    const project = this.projectService.add({ name });
    this.formElementService.createForm(name, project.id);
  }
}
