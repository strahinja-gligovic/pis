import { User } from './user.model';
import { Client } from './client.model';
import { Movie } from './movie.model';

export class Rental {
    _id: String;
    user: User;
    client: Client;
    movie: Movie;
    startDate: Date;
    returnDate: Date;

    constructor(json?: any) {
        if (json) {
            this._id = json._id;
            this.user = new User(json.user);
            this.client = new Client(json.client);
            this.movie = new Movie(json.movie);
            if (json.startDate) {
                this.startDate = new Date(json.startDate);
            }
            if (json.returnDate) {
                this.returnDate = new Date(json.returnDate);
            }
        } else {
            this.client = new Client();
            this.movie = new Movie();
        }
    }
}
