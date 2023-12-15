import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Computer } from 'src/interfaces/computer';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@Component({
  selector: 'app-computer-form',
  template: `
  <div class="main-container">
    <form class="computer-form" autocomplete="off" [formGroup]="computerForm" (ngSubmit)="submitForm()">

      <!--Asset Type Selection-->
      <div class="mb-3 px-5">
        <b>Select Asset Type</b>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="type" name="type" id="type-computer" value="Computer" required>
          <label class="form-check-label" for="location-computer">Computer</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="type" name="type" id="type-printer" value="Printer" required>
          <label class="form-check-label" for="location-printer">Printer</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="type" name="type" id="type-phone" value="Phone" required>
          <label class="form-check-label" for="location-phone">Phone</label>
        </div>
      </div>

      <!--Computer name and name validation-->
      <div class="form-floating mb-3 px-4">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name" class="px-5">Name</label>
      </div>
      
      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Name is Required.
        </div>

        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 3 characters long.
        </div>
      </div>

      <!--Computer serial number and serial number validation-->
      <div class="form-floating mb-3 px-4">
        <input class="form-control" type="text" formControlName="serial" placeholder="Serial number" required>
        <label for="serial" class="px-5">Serial Number</label>
      </div>

      <div *ngIf="serial.invalid && (serial.dirty || serial.touched)" class="alert alert-danger">
        <div *ngIf="serial.errors?.['required']">
          Serial number required.
        </div>
        <div *ngIf="serial.errors?.['minlength']">
          Serial Number must be at least 5 characers long.
        </div>
      </div>

      <!--Computer manufacturer and manufacturer validation-->
      <div class="form-floating mb-3 px-4">
        <input class="form-control" type="text" formControlName="manufacturer" placeholder="Manufacturer" required>
        <label for="manufacturer" class="px-5">Manufacturer</label>
      </div>

      <div *ngIf="manufacturer.invalid && (manufacturer.dirty || manufacturer.touched)" class="alert alert-danger">
        <div *ngIf="manufacturer.errors?.['required']">
          Manufacturer is required.
        </div>
        <div *ngIf="manufacturer.errors?.['minlength']">
          Manufacturer must be at least 2 characers long.
        </div>
      </div>

      <!--Computer model and model validation-->
      <div class="form-floating mb-3 px-4">
        <input class="form-control" type="text" formControlName="model" placeholder="Model" required>
        <label for="model" class="px-5">Model</label>
      </div>

      <div *ngIf="model.invalid && (model.dirty || model.touched)" class="alert alert-danger">
        <div *ngIf="model.errors?.['required']">
          Model is required.
        </div>
        <div *ngIf="model.errors?.['minlength']">
          Model must be at least 1 characer long.
        </div>
      </div>

      <!--Computer ram and ram validation-->
      <div class="form-floating mb-3 px-4">
        <input class="form-control" type="text" formControlName="ram" placeholder="RAM" required>
        <label for="ram" class="px-5">RAM</label>
      </div>

      <div *ngIf="ram.invalid && (ram.dirty || ram.touched)" class="alert alert-danger">
        <div *ngIf="ram.errors?.['required']">
          RAM is required.
        </div>
        <div *ngIf="ram.errors?.['minlength']">
          RAM must be at least 1 characer long.
        </div>
      </div>

      <!--Computer location-->
      <div class="mb-3 px-5">
      <b>Select Asset Location</b>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-mailroom" value="Mailroom" required>
          <label class="form-check-label" for="location-mailroom">Mailroom</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-admin" value="Admin" required>
          <label class="form-check-label" for="location-admin">Admin</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-client" value="Client" required>
          <label class="form-check-label" for="location-client">Client</label>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="computerForm.invalid">Add</button>

    </form>
</div>

  `,
  styleUrls: [ './computer-form.component.css']
})

export class ComputerFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Computer> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Computer>();

  @Output()
  formSubmitted = new EventEmitter<Computer>();

  computerForm: FormGroup = new FormGroup({});

  constructor (private fb: FormBuilder) {}

  get type() { return this.computerForm.get('type')!; }
  get name() { return this.computerForm.get('name')!; }
  get serial() { return this.computerForm.get('serial')!; }
  get manufacturer() { return this.computerForm.get('manufacturer')!; }
  get model() { return this.computerForm.get('model')!; }
  get ram() { return this.computerForm.get('ram')!; }
  get location() {return this.computerForm.get('location')!; }

  ngOnInit() {
    this.initialState.subscribe(computer => {
      this.computerForm = this.fb.group({
        type: [ computer.type, [Validators.required] ], 
        name: [ computer.name, [Validators.required] ],
        serial: [ computer.serial, [Validators.required] ],
        manufacturer: [ computer.manufacturer, [Validators.required] ],
        model: [ computer.model, [Validators.required] ],
        ram: [ computer.ram, [Validators.required] ],
        location: [ computer.location, [Validators.required] ]
      });
    });
      
    this.computerForm.valueChanges.subscribe((val) => {this.formValuesChanged.emit(val); });

  }

  submitForm(){
    this.formSubmitted.emit(this.computerForm.value);
  }


}
