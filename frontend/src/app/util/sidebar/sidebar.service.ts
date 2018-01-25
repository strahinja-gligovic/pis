import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

    // malo komplikovaniji oblik događaja ( naspram onog u komponentama )
    // ovde želimo da pratimo stanje toggled promenljive i treba da nam je dostupno uvek
    // komponenta koja se pretplati na BehaviorSubject odmah će imati uvid u vrednost toggled
    private toggled: Boolean = true;
    // podklasa Subject koja omogućava postavljanje inicijalne vrednosti
    toggled$: BehaviorSubject<Boolean>;

    constructor() {
        // setujemo inicijalnu vrednost kroz konstruktor
        this.toggled$ = new BehaviorSubject<Boolean>(this.toggled);
    }

    toggleSidebar(value?: Boolean) {
        if (value == null) {
            // menjamo stanje
            this.toggled = !this.toggled;
        } else {
            this.toggled = value;
        }

        // obaveštavama Subject da mu se stanje promenilo
        this.toggled$.next(this.toggled);

        this.dammitDatatable();
    }

    private dammitDatatable() {
        // klasičan budž
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 600);
    }
}
