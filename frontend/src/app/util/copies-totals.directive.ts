import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appCopiesTotals][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CopiesTotalsDirective), multi: true }
  ]
})
export class CopiesTotalsDirective implements Validator {

  @Input('greaterThan') greaterThan;

  constructor() { }

  validate(totalControl: AbstractControl): { [key: string]: any; } {
    const totalValue = totalControl.value;

    if (totalValue < this.greaterThan) {
      return {
        gt: true
      };
    }

    return null;
  }

}
