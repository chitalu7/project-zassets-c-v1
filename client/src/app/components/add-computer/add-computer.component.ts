import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Computer } from 'src/interfaces/computer';
import { ComputerService } from 'src/services/computer.service';

@Component({
  selector: 'app-add-computer',
  template: `
    <h2 class="text-center m-5"> Add a New Computer</h2>
    <app-computer-form (formSubmitted)="addComputer($event)"></app-computer-form>
    
  `
})
export class AddComputerComponent {
  constructor(
    private router: Router, 
    private computerService: ComputerService
  ) {}

  addComputer (computer: Computer) {
    this.computerService.createComputer(computer)
      .subscribe({
        next:() => {
          this.router.navigate(['/computers']);
        },
        error: (error) => {
          alert("Failed to create computer");
          console.error(error);
        }
      });
  }
}
