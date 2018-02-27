import { Directive } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Directive({
  selector: '[appProvideForm]',
  providers: [
      {
          provide: ControlContainer,
          useFactory: function (form: NgForm) {
              return form ? form : new Object();
          },
          deps: [NgForm]
      }
  ]
})
export class ProvideFormDirective {}
