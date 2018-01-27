import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../models/movie.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MovieComponent } from './movie/movie.component';
import { Subscription } from 'rxjs/Subscription';
import { Address, countries } from '../../models/address.model';

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

  constructor(private modalService: BsModalService, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  // sa template prosleđujemo samo id filma, a ne ceo objekat
  openMovieModal(movie_id: String) {

    const initialState = {
      movie_id
    };

    // ostavljamo Movie komponenti da se bavi sa GET filma
    const modalRef = this.modalService.show(MovieComponent, { initialState, class: 'modal-lg' });

    this.moviesChanged = modalRef.content.moviesChanged$.subscribe(movie => {
      this.updateMovieRows(movie);
    }, error => { }, () => { this.moviesChanged.unsubscribe(); });
  }

  private deleteMovie(movie_id: String) {
    this.movieService.deleteMovie(movie_id).subscribe(res => {
      this.toggleSuccessMessage();
      for (let i = 0; i < this.movies.length; i++) {
        const element = this.movies[i];
        if (element._id === movie_id) {
          this.movies.splice(i, 1);
          this.movies = [...this.movies];
          break;
        }
      }
    }, error => {

    });
  }

  private updateMovieRows(movie) {
    let found = false;

    for (let i = 0; i < this.movies.length; i++) {
      const movieElement = this.movies[i];

      if (movieElement._id === movie._id) {
        found = true;
        Object.assign(movieElement, movie);
        break;
      }
    }

    if (!found) {
      this.movies.push(movie);
    }

    this.movies = [...this.movies];
  }

  private getMovies() {
    this.movieService.listMovies().subscribe(movies => {
      this.movies = movies;
    }, error => {

    });
  }

  private toggleSuccessMessage() {
    const duration = 3000;

    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, duration);
  }

}
