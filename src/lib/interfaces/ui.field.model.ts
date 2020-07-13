import { UINestedField } from './ui.nested.field.model';

export interface UIField {
  name: string;
  type: string | UINestedField[];
  ref?: string;
  required?: boolean;
  unique?: boolean;
}


