import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applyTransaction, ID } from '@datorama/akita';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project, createProject } from './project.model';
import { ProjectQuery } from './project-query.service';
import { ProjectStore } from './project-store.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(
    private http: HttpClient,
    private projectQuery: ProjectQuery,
    private projectStore: ProjectStore
  ) {}

  get(id: ID) {
    if (this.projectQuery.hasEntity(id)) {
      this.projectStore.setActive(id);
      return of(this.projectQuery.getEntity(id));
    }

    this.projectStore.setLoading(true);
    return this.http.get<Project>('https://api.com').pipe(
      tap((project) => {
        this.projectStore.add(project);
        this.projectStore.setActive(id);
        this.projectStore.setLoading(false);
      })
    );
  }

  add(project: Partial<Project>) {
    const result = createProject(project);
    applyTransaction(() => {
      this.projectStore.add(result);
      this.projectStore.setActive(result.id);
    });
    return result;
  }

  setActive(id: ID) {
    this.projectStore.setActive(id);
  }

  update(id, project: Partial<Project>) {
    this.projectStore.update(id, project);
  }

  remove(id: ID) {
    this.projectStore.remove(id);
  }
}
