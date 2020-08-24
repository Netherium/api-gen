import { UIEntity } from './ui-entity.model';

export interface UI {
  generateApp: boolean;
  projectName?: string;
  entities?: UIEntity[];
  swaggerDocs: boolean;
  swaggerPath: string;
}
