import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'

@Directive({
  selector: '[appMin]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator {

  @Input() min: number;

  validate(control: AbstractControl): { [key: string]: any } {
    debugger;
    return Validators.min(this.min)(control);
  }
}
