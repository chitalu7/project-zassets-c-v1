import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //It will need this to communicate with the API using HTTP requests
import { Observable, BehaviorSubject, Subject, tap, of } from 'rxjs';
import { Computer } from 'src/interfaces/computer';

@Injectable({
  providedIn: 'root'
})

export class ComputerService {
  private url = 'http://localhost:5200'; // This uses the URL to request the data from DB

  private computers$: Subject<Computer[]> = new Subject();
  private finalAssetCount = new BehaviorSubject<string[]>([]);
  private assetCount: string [] = [];

  private allAssetsCount: number = 0;
  private computerCount: number = 0;
  private printerCount: number = 0;
  private phoneCount: number = 0; 

  constructor (private httpClient: HttpClient) {  }  

  
  private refreshComputers(){
    this.httpClient.get<Computer[]>(`${this.url}/computers`)
      .subscribe(computers => {

        // Reset counters for assets before updating the new data
        this.allAssetsCount = 0;
        this.computerCount = 0;
        this.printerCount = 0;
        this.phoneCount = 0;

        computers.forEach(element => {
          if (element.type == "Printer") {
            this.printerCount++;
          } else if (element.type == "Computer") {
            this.computerCount++;
          } else if (element.type == "Phone") {
            this.phoneCount++;
          }
        });

        this.allAssetsCount = this.printerCount + this.computerCount + this.phoneCount;

        this.assetCount = [
          "All Assets: " + this.allAssetsCount.toString(), 
          "Computers: " + this.computerCount.toString(), 
          "Printers: " + this. printerCount.toString(),
          "Phones: " + this.phoneCount.toString()
        ];


        this.setAssetCount(this.assetCount);

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

  setAssetCount(value: string[]): void {
    
    this.finalAssetCount.next(value);    
  }

  forceRefresh(): void {
    this.refreshComputers();
  }

  getAssetTypeCount(): Observable<string[]> {    
    return this.finalAssetCount.asObservable();
  }
 
}
