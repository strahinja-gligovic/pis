import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../models/movie.model';
import { TMDB_BASE_URL, TMDB_IMG_BASE_URL } from '../../util/const';

@Injectable()
export class MovieService {

    constructor(private http: HttpClient) {
    }

    getMovie(movie_id): Observable<Movie> {
        return this.http.get('/api/movie/get/' + movie_id)
            .map(response => new Movie(response));
    }

    listMovies(...excludeFields): Observable<Movie[]> {
        // klasa HttpParams je immutable
        // svaka operacija promene ovog objekta ne menja taj objekat
        // već vraća novu instancu sa izmenama
        let queryParams = new HttpParams();

        // sva imena polja koja želimo da isključimo smeštamo u array
        const params = [];
        for (let i = 0; i < excludeFields.length; i++) {
            const field = excludeFields[i];
            params.push(field);
        }

        if (params.length) {
            queryParams = queryParams.set('exclude', params.toString());
        }

        return this.http.get('/api/movie/list/', { params: queryParams })
            .map(response => <Movie[]>response);
    }

    private addMovie(movie: Movie): Observable<Movie> {
        return this.http.post('/api/movie/add/', movie)
            .map(response => new Movie(response));
    }

    private updateMovie(movie: Movie): Observable<Movie> {
        return this.http.put('/api/movie/update/', movie)
            .map(response => new Movie(response));
    }

    deleteMovie(movie_id: String): Observable<any> {
        return this.http.delete('/api/movie/delete/' + movie_id);
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
        return this.http.get(TMDB_IMG_BASE_URL + posterPath, { responseType: 'blob' });
    }

}
