export class Address {
    street: String;
    city: String;
    zip: String;
    country: String;

    constructor(json: any) {
        this.street = json.street;
        this.city = json.city;
        this.zip = json.zip;
        this.country = json.country;
    }
}