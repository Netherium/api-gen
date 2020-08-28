import { AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[isSelectedObject][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IsSelectedObjectValidator, multi: true }
  ]
})
export class IsSelectedObjectValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = isSelectedObjectFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}

function isSelectedObjectFactory(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return (control.value === null) || control.value.hasOwnProperty('_id') ? null : {
      isSelectedObject: { valid: false }
    };
  };
}
