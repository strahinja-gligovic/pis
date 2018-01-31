import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appCopiesTotals][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CopiesTotalsDirective), multi: true }
  ]
})
// 'poslovna logika'
// ne može se ukloniti više kopija filma od razlike broja ukupnih i dostupnih kopija
// filmovi koji su izdati treba prvo da se označe kao vraćeni pa tek onda da se uklone
// ovo pravilo smo implementirali custom direktivom
export class CopiesTotalsDirective implements Validator {

  // vrednost koju bindujemo na template ( razlika ukupnih i dostupnih kopija )
  @Input('greaterThan') greaterThan;

  constructor() { }

  validate(totalControl: AbstractControl): { [key: string]: any; } {
    // broj ukupnih kopija
    const totalValue = totalControl.value;

    // ako nema vrednosti nema ni ove greške
    // ovo radimo da bi na polju ostala samo required greška
    // korisno zbog prikazivanja poruka
    if (totalValue === null) {
      return null;
    }

    if (totalValue < this.greaterThan) {
      // setujemo grešku 'gt' na polju
      return {
        gt: true
      };
    } else {
      return null;
    }
  }

}
