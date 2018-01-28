export class User {
    _id: String;
    username: String;
    password: String;

    constructor(json?: any) {
        if (json) {
            this._id = json._id;
            this.username = json.username;
        }
    }
}
