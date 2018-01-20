import { Address } from "./address.model";

export class Client {
    _id: string;
    firstName: String;
    lastName: String;
    email: String;
    dob: Date;
    address: Address;

    constructor(json : any) {
        this._id = json._id;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.dob = json.dob;
        this.address = new Address(json.address);
    }
}