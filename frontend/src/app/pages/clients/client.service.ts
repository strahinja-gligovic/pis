import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';

@Injectable()
export class ClientService {

    constructor(private http: HttpClient) {
    }

    getClient(client_id): Observable<Client> {
        return this.http.get('/api/client/get/' + client_id)
            // map funkcija se poziva pre nego što se povratni podaci proslede dalje
            // ovde želimo da od jsona napravimo instancu klase našeg modela
            .map(response => new Client(response));
    }

    listClients(): Observable<Client[]> {
        return this.http.get('/api/client/list/')
            .map(response => <Client[]>response);
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post('/api/client/add/', client)
            .map(response => new Client(response));
    }

    updateClient(client: Client): Observable<any> {
        return this.http.put('/api/client/update/', client)
            .map(response => new Client(response));
    }

    deleteClient(client_id: String): Observable<any> {
        // setujemo responseType na text jer sa bekenda šaljemo "OK";
        return this.http.delete('/api/client/delete/' + client_id, { responseType: 'text' });
    }

    saveClient(client: Client): Observable<Client> {
        if (client._id) {
            return this.updateClient(client);
        } else {
            return this.addClient(client);
        }
    }

}
