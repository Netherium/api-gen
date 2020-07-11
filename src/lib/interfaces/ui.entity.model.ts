import { UIField } from './ui.field.model';

export interface UIEntity {
  name: string;
  capitalizedName: string;
  fields: UIField[];
  timestamps: boolean;
  populate: boolean;
}
