import { Movie } from './../../../models/movie.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  // prilagođava remaining vrednost na osnovu unete total vrednosti
  // getter se koristi kao bilo koja druga readonly promenljiva
  // this.remainingValue / {{remainingValue}}
  get remainingValue(): number {
    const totalFormValue = this.movieForm.controls['total'].value;
    const totalValueDifference = this.movie.total - totalFormValue;

    const remainingValue = this.movie.remaining - totalValueDifference;

    if (remainingValue < 0) {
      return 0;
    } else {
      return remainingValue;
    }
  }

  constructor(private bsModalRef: BsModalRef, private movieService: MovieService, private completerService: CompleterService) {
  }

  ngOnInit() {
    // movie_id možemo da dobijemo iz Movies komponente i u tom slučaju radimo GET filma
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

  private posterChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      this.createImageFromBlob(file);
    }
  }

  private onSelectedTmdb(data: CompleterItem) {
    let valuesToPatch;
    if (data) {
      const movieData = data.originalObject;

      valuesToPatch = {
        title: movieData.title,
        releaseDate: new Date(movieData.release_date),
        overview: movieData.overview
      };
      this.movie.tmdb = movieData.id;
      if (movieData.poster_path) {
        this.movieService.getMoviePoster(movieData.poster_path)
          .subscribe(blob => {
            this.createImageFromBlob(blob);
          });
      }
    } else {
      valuesToPatch = {
        title: null,
        releaseDate: null,
        overview: null,
      };

      this.movie.tmdb = null;
      this.movie.poster = null;
    }

    this.movieForm.form.patchValue(valuesToPatch);
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
