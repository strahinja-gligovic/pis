import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

    // malo komplikovaniji oblik događaja ( naspram onog u komponentama )
    // ovde želimo da pratimo stanje toggled promenljive i treba da nam je dostupno uvek
    // komponenta koja se pretplati na BehaviorSubject odmah će imati uvid u vrednost toggled
    private toggled: Boolean = true;
    // podklasa Subject koja omogućava postavljanje inicijalne vrednosti
    toggled$: BehaviorSubject<Boolean>;

    // UI
    private onResizeTriggered = false;

    constructor() {
        // setujemo inicijalnu vrednost kroz konstruktor
        this.toggled$ = new BehaviorSubject<Boolean>(this.toggled);
    }

    toggleSidebar() {
        // menjamo stanje
        this.toggled = !this.toggled;

        // obaveštavama Subject da mu se stanje promenilo
        this.toggled$.next(this.toggled);

        // UI
        if (this.onResizeTriggered) {
            this.onResizeTriggered = false;
        } else {
            this.dammitDatatable();
        }
    }

    private setSidebar(value: Boolean) {
        this.toggled = value;

        this.toggled$.next(this.toggled);
    }

    // UI
    onResize(event) {
        const width = event.target.innerWidth;
        if (width < 768) {
            if (this.onResizeTriggered === false) {
                this.setSidebar(false);
                this.onResizeTriggered = true;
            }
        }
    }

    private dammitDatatable() {
        // klasičan budž
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 600);
    }
}
