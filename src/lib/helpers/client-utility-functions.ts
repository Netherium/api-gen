import { UIField } from '../interfaces/ui-field.model';
import { UINestedField } from '../interfaces/ui-nested-field.model';

export const getDisplayProperty = (uiField: UIField | UINestedField): string => {
  switch (true) {
    case uiField.hasOwnProperty('displayProperty'):
      return uiField.displayProperty;
    default:
      return '_id';
  }
}
