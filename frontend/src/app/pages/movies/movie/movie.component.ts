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

  movie: Movie;
  @ViewChild('movieForm') movieForm: NgForm;
  error: any;
  madeChanges = false;
  submitted = false;
  success = false;

  tmdbDatasource: RemoteData;
  tmdbImageUrl: String;

  private moviesChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private movieService: MovieService, private completerService: CompleterService) {

  }

  ngOnInit() {
    this.moviesChanged$ = new EventEmitter<Boolean>();

    this.tmdbDatasource = this.completerService.remote(
      null,
      'title',
      'title');
    this.tmdbDatasource.urlFormater(term => {
      return `${TMDB_BASE_URL}search/movie${TMDB_API_KEY}&query=${term}`;
    });
    this.tmdbDatasource.dataField('results');
  }

  ngOnDestroy(): void {
    this.moviesChanged$.emit(this.madeChanges);
  }

  saveMovie() {
    const movie: Movie = this.movieForm.value;
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

  onHighlightedTmdb(data: CompleterItem) {
    if (data) {
      const movieData = data.originalObject;
    }
  }

  onSelectedTmdb(data) {
    if (data) {
      const movieData = data.originalObject;
      this.movie.tmdb = movieData.id;
      this.movie.title = movieData.title;
      this.movie.releaseDate = new Date(movieData.release_date);
      this.tmdbImageUrl = TMDB_IMG_BASE_URL + movieData.poster_path;
      console.log(this.tmdbImageUrl);
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
