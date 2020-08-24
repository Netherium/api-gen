import { UIField } from '../interfaces/ui-field.model';
import { UINestedField } from '../interfaces/ui-nested-field.model';
import { hasOwnProperty } from 'tslint/lib/utils';

export const getDisplayProperty = (uiField: UIField | UINestedField): string => {
  switch (true) {
    case hasOwnProperty(uiField, 'displayProperty'):
      return uiField.displayProperty;
    default:
      return '_id';
  }
}
