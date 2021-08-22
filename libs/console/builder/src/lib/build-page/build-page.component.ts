import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormElementService } from '../state/form-element.service';
import { ProjectQuery } from '../state/project-query.service';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'formidable-build-page',
  template: `
    <formidable-nav *teleportTo="'nav'">
      <span title>builder</span>
      <div alignRight>
        <button (click)="onCreate('dummy')">create project</button>
      </div>
    </formidable-nav>

    <div class="overflow-y-hidden flex flex-row h-full">
      <nav class="flex flex-col mx-6">
        <div class="mt-6 ml-2">
          <formidable-projects
            [projects]="projects$ | async"
            (create)="onCreate($event)"
          ></formidable-projects>
        </div>
      </nav>

      <div class="w-full">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .nav {
        width: 10rem;
      }
    `,
  ],
})
export class BuildPageComponent {
  projects$ = this.projectQuery.selectAll();

  constructor(
    private formElementService: FormElementService,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onCreate(name: string) {
    const project = this.projectService.add({ name });
    this.formElementService.createForm(name, project.id);
    this.router.navigate([project.id], { relativeTo: this.route });
  }
}
