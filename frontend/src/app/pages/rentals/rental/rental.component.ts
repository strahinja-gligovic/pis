import { Rental } from './../../../models/rental.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { RentalService } from '../rental.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../../models/client.model';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../movies/movie.service';
import { ClientService } from '../../clients/client.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html'
})
export class RentalComponent implements OnInit, OnDestroy {

  private rental: Rental;
  private error: any;
  private submitted = false;
  private success = false;
  private today: Date;

  private clients$: Observable<Client[]>;
  private movies$: Observable<Movie[]>;

  private rentalsChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private rentalService: RentalService, private movieService: MovieService,
    private clientService: ClientService) {
    this.today = new Date();
  }

  ngOnInit() {
    this.rentalsChanged$ = new EventEmitter<Boolean>();

    this.clients$ = this.clientService.listClients();
    this.movies$ = this.movieService.listMovies('poster').map(movies => {
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        // ne mogu da se izdaju filmovi bez dostupnih kopija
        if (movie.remaining === 0) {
          movie['disabled'] = true;
        }
      }
      return movies;
    });
  }

  ngOnDestroy(): void {
    this.rentalsChanged$.complete();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  private saveRental() {
    this.submitted = true;

    this.rentalService.saveRental(this.rental).subscribe(res => {
      this.submitted = false;
      this.success = true;
      this.rentalsChanged$.emit(true);

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }

}
