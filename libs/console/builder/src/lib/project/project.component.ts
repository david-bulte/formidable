import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FormElementService } from '../state/form-element.service';
import { ProjectQuery } from '../state/project-query.service';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'formidable-project',
  template: `
    <div class="flex justify-between h-screen" style="overflow-y: hidden">
      <!--      <div class="w-4/12 mr-8 mt-6">-->
      <div class="mr-8 mt-6 max-w-lg w-2/12">
        <formidable-palette></formidable-palette>
      </div>

      <!--      <div class="w-full mt-6 ">-->
      <div class="flex-1 mt-6 ">
        <formidable-canvas></formidable-canvas>
      </div>

      <!--      <div class="w-4/12 ml-4 mt-6 mr-1">-->
      <div class="ml-4 mt-6 mr-1 max-w-lg w-3/12" style="display: flex;
    flex-direction: column;
    overflow-y: hidden;">
        <formidable-properties></formidable-properties>
      </div>
    </div>
  `,
  styles: [
    `
      /*:host {*/
      /*  display: block;*/
      /*}*/
      
      :host {
          display: flex;
          flex-direction: column;
          overflow-y: hidden;
          flex: 1;
      }
    `,
  ],
})
@UntilDestroy()
export class ProjectComponent implements OnInit {
  project$ = this.projectQuery.selectActive();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery,
    private formElementService: FormElementService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.projectService.get(params.get('id')).pipe(
            catchError(() => {
              // todo error management
              return of(null);
            })
          )
        ),
        tap(() => {
          // this.formElementService.setActive(null)
          this.formElementService.clear();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
