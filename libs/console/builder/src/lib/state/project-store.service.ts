import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Project } from './project.model';

export type ProjectState = EntityState<Project>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'project' })
export class ProjectStore extends EntityStore<ProjectState> {

  constructor() {
    super();
  }

}
