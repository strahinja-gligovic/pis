import { Movie } from './../../../models/movie.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { countries, Address } from '../../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { CompleterService, RemoteData } from 'ng2-completer';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMG_BASE_URL } from '../../../util/const';
import { CompleterData } from 'ng2-completer/services/completer-data';
import { CompleterItem } from 'ng2-completer/components/completer-item';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie_id: number;
  // u slučaju da treba da radimo asinhroni GET filma, ovaj objekat nam neće biti odmah dostupan
  // takođe ima neke osobine koje bi hteli programski da menjamo, a i želimo da korisnici
  // imaju mogućnost da isprave podatke učitane sa TMDB
  // it tih razloga ne koristimo two-way binding
  movie: Movie;
  // iz ovog objekta kupimo vrednosti koje je korisnik uneo na formu
  @ViewChild('movieForm') movieForm: NgForm;

  // tmdb
  tmdbDatasource: RemoteData;
  tmdbImageUrl: String;

  // UI
  error: any;
  madeChanges = false;
  submitted = false;
  success = false;

  moviesChanged$: EventEmitter<Movie>;

  constructor(private bsModalRef: BsModalRef, private movieService: MovieService, private completerService: CompleterService) {
  }

  ngOnInit() {
    // movie_id možemo da dobijemo iz Movies komponente u tom slučaju radimo GET filma
    if (this.movie_id) {
      this.movieService.getMovie(this.movie_id).subscribe(movie => {
        this.movie = movie;
      }, error => {
        this.error = error.error;
      });
      // u ovom slučaju instanciramo objekat
    } else {
      this.movie = new Movie();
    }
    this.moviesChanged$ = new EventEmitter<Movie>();

    this.initTmdbDatasource();
  }

  ngOnDestroy(): void {
    this.moviesChanged$.complete();
  }

  saveMovie() {
    // potencijalno izmenjene vrednosti sa forme
    const formMovie: Movie = this.movieForm.value;
    // prvi parametar je target objekat
    // svaki sledeći parametar je source objekat
    // ova funkcije ide redom kroz source objekte i kopira im vrednosti u target
    // na ovaj način dobijamo sve vrednosti iz this.movie ali sa izmenama napravljenim na formi
    Object.assign(this.movie, formMovie);

    this.submitted = true;

    this.movieService.saveMovie(this.movie).subscribe(movie => {
      this.submitted = false;
      this.success = true;
      this.madeChanges = true;

      // sad više parent komponentu ne obaveštavamo booleanom, već šaljemo ceo izmenjen objekat
      // nećemo ponovo da pravimo nepotreban zahtev
      this.moviesChanged$.emit(movie);

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }

  private handleTotal() {
    if (this.movie._id) {
      const totalCtrl = this.movieForm.controls['total'];
      const remainingCtrl = this.movieForm.controls['remaining'];

      const totalDifference = totalCtrl.value - this.movie.total;
      const remainingAdjusted = this.movie.remaining + totalDifference;

      if (remainingAdjusted < 0) {
        const errorObject = {};
        errorObject['gt'] = true;
        if (totalCtrl.value === null) {
          errorObject['required'] = true;
        }
        totalCtrl.setErrors(errorObject);
      } else {
        remainingCtrl.setValue(remainingAdjusted);
        totalCtrl.setErrors(null);
      }
    }
  }

  private onHighlightedTmdb(data: CompleterItem) {
    if (data) {
      const movieData = data.originalObject;
    }
  }

  private onSelectedTmdb(data: CompleterItem) {
    if (data) {
      const movieData = data.originalObject;
      this.movie.tmdb = movieData.id;
      this.movie.title = movieData.title;
      this.movie.releaseDate = new Date(movieData.release_date);
      this.movie.overview = movieData.overview;
      this.movie.rating = movieData.rating;
      if (movieData.poster_path) {
        this.movieService.getMoviePoster(movieData.poster_path)
          .subscribe(blob => {
            this.createImageFromBlob(blob);
          });
      }
      console.log(movieData);
    }
  }

  private initTmdbDatasource() {
    this.tmdbDatasource = this.completerService.remote(
      null,
      'title',
      'title');
    this.tmdbDatasource.urlFormater(term => {
      return `${TMDB_BASE_URL}search/movie${TMDB_API_KEY}&query=${term}`;
    });
    this.tmdbDatasource.dataField('results');
  }

  private closeModal() {
    this.bsModalRef.hide();
  }

  private createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.movie.poster = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
