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
        // potreban nam je name getter Client klase da bi na UI prikazali puno ime klijenta
        // kastovanje JSONa utiče samo na vreme pre kompajliranja koda
        // to znači da ne dobijamo mogućnost korišćenja funkcija definisanih u klasi
        // moramo da instanciramo objekte kako bi mogli koristiti sve funkcionalnosti
        return this.http.get('/api/client/list/')
            // kastujemo JSON u array
            // ako zakomentarišemo sledeću liniju nećemo moći da pristupimo responseArray.length u narednom callback
            // tj mogli bismo sa responseArray['length'] ali onda ne koristimo type safety
            // ( typescript  ¯\_(ツ)_/¯ )
            .map(responseJson => <Array<Client>>responseJson)
            // instanciramo objekte jedan po jedan
            .map(responseArray => {
                const clients = new Array<Client>();
                for (let i = 0; i < responseArray.length; i++) {
                    const clientJson = responseArray[i];
                    const clientObject = new Client(clientJson);
                    clients.push(clientObject);
                }
                return clients;
            });
    }

    private addClient(client: Client): Observable<Client> {
        return this.http.post('/api/client/add/', client)
            .map(response => new Client(response));
    }

    private updateClient(client: Client): Observable<Client> {
        return this.http.put('/api/client/update/', client)
            .map(response => new Client(response));
    }

    deleteClient(client_id: String): Observable<String> {
        // setujemo responseType na text jer šaljemo "OK"
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
