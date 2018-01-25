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

  movies: Movie[];
  moviesChanged: Subscription;

  // UI
  success = false;

  constructor(private modalService: BsModalService, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  openMovieModal(movie?: Movie) {
    if (!movie) {
      movie = new Movie();
    } else {
      movie = new Movie(movie);
    }

    const initialState = {
      movie: movie
    };

    const modalRef = this.modalService.show(MovieComponent, { initialState });

    this.moviesChanged = modalRef.content.moviesChanged$.subscribe(changed => {
      if (changed) {
        this.getMovies();
        this.toggleSuccessMessage();
      }
    }, error => { }, () => { this.moviesChanged.unsubscribe(); });
  }

  deleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie._id).subscribe(res => {
      this.toggleSuccessMessage();
      for (let i = 0; i < this.movies.length; i++) {
        const element = this.movies[i];
        if (element._id === movie._id) {
          this.movies.splice(i, 1);
        }
      }
    }, error => {
    });
  }

  getMovies() {
    this.movieService.listMovies().subscribe(movies => {
      this.movies = movies;
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
