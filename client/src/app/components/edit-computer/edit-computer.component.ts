import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Computer } from 'src/interfaces/computer';
import { ComputerService } from 'src/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  template: `
    <h2 class="text-center m-5">Edit a Computer</h2>
    <app-computer-form [initialState]="computer" (formSubmitted)="editComputer($event)"></app-computer-form>
  `,
  styles: [
  ]
})
export class EditComputerComponent implements OnInit {
  computer: BehaviorSubject<Computer> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private computerService: ComputerService,
  ) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert("No id provided");
    }

    this.computerService.getComputer(id !).subscribe((computer) => {
      this.computer.next(computer);
    });
  }

  editComputer(computer: Computer) {
    this.computerService.updateComputer(this.computer.value._id || '', computer)
      .subscribe({
        next: () => {
          this.router.navigate(['/computers']);
        },
        error: (error) => {
          alert('Failed to update computer');
          console.error(error);
        }
      })
  }

}
