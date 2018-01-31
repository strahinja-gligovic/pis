import { Address } from './address.model';

export class Client {
    _id: string;
    firstName: String;
    lastName: String;
    email: String;
    dob: Date;
    address: Address;

    get name(): string {
        return this.firstName + ' ' + this.lastName;
    }

    constructor(json?: any) {
        if (json) {
            this._id = json._id;
            this.firstName = json.firstName;
            this.lastName = json.lastName;
            this.email = json.email;
            this.dob = new Date(json.dob);
            if (json.address) {
                this.address = new Address(json.address);
            }
        } else {
            this.address = new Address();
        }
    }
}
