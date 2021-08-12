import { guid, ID } from '@datorama/akita';
import { FormElement } from '@formidable/shared/renderer';

export interface Project {
  id: ID;
  name: string;
  form: FormElement;
}

export function createProject(params: Partial<Project>) {
  return {
    id: guid(),
    name: params.name,
  } as Project;
}
