import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Computer } from 'src/interfaces/computer';

@Component({
  selector: 'app-computer-form',
  template: `
    <form class="computer-form" autocomplete="off" [formGroup]="computerForm" (ngSubmit)="submitForm()">

      <!--Computer name and name validation-->
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name">Name</label>
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
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="serial" placeholder="Serial number" required>
        <label for="serial">Serial Number</label>
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
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="manufacturer" placeholder="Manufacturer" required>
        <label for="manufacturer">Manufacturer</label>
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
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="model" placeholder="Model" required>
        <label for="model">Model</label>
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
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="ram" placeholder="RAM" required>
        <label for="ram">RAM</label>
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
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-mailroom" value="mailroom" required>
          <label class="form-check-label" for="location-mailroom">Mailroom</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-admin" value="admin" required>
          <label class="form-check-label" for="location-admin">Admin</label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="location" name="location" id="location-client" value="client" required>
          <label class="form-check-label" for="location-client">Client</label>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="computerForm.invalid">Add</button>
    </form>
  `,
  styles: [
  ]
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

  get name() { return this.computerForm.get('name')!; }
  get serial() { return this.computerForm.get('serial')!; }
  get manufacturer() { return this.computerForm.get('manufacturer')!; }
  get model() { return this.computerForm.get('model')!; }
  get ram() { return this.computerForm.get('ram')!; }
  get location() {return this.computerForm.get('location')!; }

  ngOnInit() {
    this.initialState.subscribe(computer => {
      this.computerForm = this.fb.group({
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
