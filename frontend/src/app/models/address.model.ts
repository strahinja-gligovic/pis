export class Address {
    street: String;
    city: String;
    zip: String;
    country: String;

    constructor(json?: any) {
        if (json) {
            this.street = json.street;
            this.city = json.city;
            this.zip = json.zip;
            this.country = json.country;
        }
    }
}
