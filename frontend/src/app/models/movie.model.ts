export class Movie {
    _id: String;
    title: String;
    releaseDate: Date;
    director: String;
    tmdb: Number;

    constructor(json?: any) {
        if (json) {
            this._id = json._id;
            this.title = json.title;
            this.releaseDate = new Date(json.releaseDate);
            this.director = json.director;
            this.tmdb = json.tmdb;
        }
    }
}
