import { Movie } from './../../../models/movie.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { countries, Address } from '../../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie;
  @ViewChild('movieForm') movieForm: NgForm;
  error: any;
  madeChanges = false;
  submitted = false;
  success = false;

  // tslint:disable-next-line:max-line-length
  protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];

  private moviesChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private movieService: MovieService) {
  }

  ngOnInit() {
    this.moviesChanged$ = new EventEmitter<Boolean>();
  }

  ngOnDestroy(): void {
    this.moviesChanged$.emit(this.madeChanges);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveMovie() {
    const movie: Movie = this.movieForm.value;
    // u formi ne čuvamo vrednost za id
    movie._id = this.movie._id;

    this.submitted = true;

    this.movieService.saveMovie(movie).subscribe(res => {
      this.submitted = false;
      this.success = true;
      this.madeChanges = true;

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }
}
