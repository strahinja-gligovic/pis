import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../models/movie.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MovieComponent } from './movie/movie.component';
import { Subscription } from 'rxjs/Subscription';
import { SUCCESS_DURATION } from '../../util/const';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {

  // model Movie u sebi sadrži sliku u String formatu
  // nećemo bez potrebe da učitavamo sve te podatke
  // zato ovu komponentu pravimo malo drugačije
  movies: Movie[];
  moviesChanged: Subscription;

  // UI
  success = false;
  submitted = false;
  error: any;

  constructor(private modalService: BsModalService, private movieService: MovieService) { }

  ngOnInit() {
    // isključujemo poster polje iz list zahteva, više o tome niz callstack
    this.getMovies('poster');
  }

  // sa template prosleđujemo samo id filma, a ne ceo objekat
  openMovieModal(movie_id: String) {

    const initialState = {
      movie_id
    };

    // ostavljamo Movie komponenti da se bavi sa GET filma
    const modalRef = this.modalService.show(MovieComponent, { initialState, class: 'modal-lg' });

    this.moviesChanged = modalRef.content.moviesChanged$.subscribe(movie => {
      // više ne dobijamo samo boolean vrednost, već ceo izmenjen objekat
      // pronaći ćemo ga u našem nizu i napraviti izmene, bez novih zahteva ka serveru
      this.updateMovieRows(movie);
      this.toggleSuccessMessage();
    }, error => {
      this.error = error;
    }, () => { this.moviesChanged.unsubscribe(); });
  }

  private deleteMovie(movie_id: String) {
    this.submitted = true;
    this.movieService.deleteMovie(movie_id).subscribe(res => {
      for (let i = 0; i < this.movies.length; i++) {
        const element = this.movies[i];
        if (element._id === movie_id) {
          this.movies.splice(i, 1);
          this.movies = [...this.movies];
          break;
        }
      }
      this.submitted = false;
      this.toggleSuccessMessage();
    }, error => {
      this.error = error.error;
      this.submitted = false;
    });
  }

  private updateMovieRows(movie: Movie) {
    // funkcija se koristi i za add i za update
    let found = false;

    // slično kao kod delete, pronalazimo odgovarajući film na osnovu _id
    for (let i = 0; i < this.movies.length; i++) {
      const movieElement = this.movies[i];

      if (movieElement._id === movie._id) {
        // update
        found = true;
        Object.assign(movieElement, movie);
        break;
      }
    }

    // add
    if (!found) {
      this.movies.push(movie);
    }

    this.movies = [...this.movies];
  }

  // ovaj operator nam omogućava da metodi prosledimo bilo koji broj ulaznih parametara
  private getMovies(...excludeFields) {
    this.submitted = true;
    // svaki od tih parametara prosleđujemo dalje
    this.movieService.listMovies(excludeFields).subscribe(movies => {
      this.movies = movies;
      this.submitted = false;
    }, error => {
      this.error = error;
      this.submitted = false;
    });
  }

  private toggleSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, SUCCESS_DURATION);
  }

}
