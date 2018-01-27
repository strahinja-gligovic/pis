import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../models/movie.model';
import { TMDB_BASE_URL, TMDB_IMG_BASE_URL } from '../../util/const';

@Injectable()
export class MovieService {

    constructor(private http: HttpClient) {
    }

    getMovie(movie_id): Observable<Movie> {
        return this.http.get('/api/movies/get/' + movie_id)
            // map funkcija se poziva pre nego što se povratni podaci proslede dalje
            // ovde želimo da od jsona napravimo instancu klase našeg modela
            .map(response => new Movie(response));
    }

    listMovies(): Observable<Movie[]> {
        return this.http.get('/api/movie/list/')
            .map(response => <Movie[]>response);
    }

    addMovie(movie: Movie): Observable<Movie> {
        return this.http.post('/api/movie/add/', movie)
            .map(response => new Movie(response));
    }

    updateMovie(movie: Movie): Observable<any> {
        return this.http.put('/api/movie/update/', movie)
            .map(response => new Movie(response));
    }

    deleteMovie(movie_id: String): Observable<any> {
        // setujemo responseType na text jer sa bekenda šaljemo "OK";
        return this.http.delete('/api/movie/delete/' + movie_id, { responseType: 'text' });
    }

    saveMovie(movie: Movie): Observable<Movie> {
        if (movie._id) {
            return this.updateMovie(movie);
        } else {
            return this.addMovie(movie);
        }
    }

    // TMDB
    getMovieTmdb(tmdb_id: number): Observable<any> {
        return this.http.get(TMDB_BASE_URL + 'movie/get' + tmdb_id);
    }

    getMoviePoster(posterPath: Number): Observable<Blob> {
        return this.http.get(TMDB_IMG_BASE_URL + posterPath, { responseType: 'blob'});
    }

}
