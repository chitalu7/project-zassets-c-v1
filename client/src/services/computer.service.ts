import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //It will need this to communicate with the API using HTTP requests
import { Observable, ObservedValuesFromArray, Subject, tap } from 'rxjs';
import { Computer } from 'src/interfaces/computer';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private url = 'http://localhost:5200'; // This uses the URL to request the data from DB

  private computers$: Subject<Computer[]> = new Subject();

  constructor (private httpClient: HttpClient) {}

  //
  private refreshComputers(){
    this.httpClient.get<Computer[]>(`${this.url}/computers`)
      .subscribe(computers => {
        this.computers$.next(computers);
      });
  }

  getComputers(): Subject<Computer[]>{
    this.refreshComputers();
    return this.computers$;
  }

  getComputer (id: string): Observable<Computer> {
    return this.httpClient.get<Computer>(`${this.url}/computers/${id}`);
  }

  createComputer (computer: Computer): Observable<string> {
    return this.httpClient.post(`${this.url}/computers`, computer, {responseType: 'text' });
  }

  updateComputer (id: string, computer: Computer): Observable<string> {
    return this.httpClient.put(`${this.url}/computers/${id}`, computer, {responseType: 'text' });
  }

  deleteComputer (id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/computers/${id}`, { responseType: 'text' });
  }
 
}
