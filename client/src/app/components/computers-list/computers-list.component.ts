import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from 'src/interfaces/computer';
import { ComputerService } from 'src/services/computer.service';

@Component({
  selector: 'app-computers-list',
  template: `
    <h2 class="text center m-5"> Computer List</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Serial</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>RAM</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let computer of computers$ | async">
          <td>{{computer.name}}</td>
          <td>{{computer.serial}}</td>
          <td>{{computer.manufacturer}}</td>
          <td>{{computer.model}}</td>
          <td>{{computer.ram}}</td>
          <td>{{computer.location}}</td>
          <td>
            <button class="btn btn-primary me-1" [routerLink]="['/computers/edit/', computer._id]">Edit</button>
            <button class="btn btn-danger" (click)="deleteComputer(computer._id || '')">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary mt-3" routerLink="/computers/new">Add a New Computer</button>
     `
})
export class ComputersListComponent implements OnInit {
  computers$: Observable<Computer[]> = new Observable();

  constructor(private computersService: ComputerService){}

  ngOnInit(): void{
    this.fetchComputers();
  }

  deleteComputer (id: string): void {
    this.computersService.deleteComputer(id).subscribe ({
      next: () => this.fetchComputers()
    });
  }

  private fetchComputers(): void {
    this.computers$ = this.computersService.getComputers();
  }

}
