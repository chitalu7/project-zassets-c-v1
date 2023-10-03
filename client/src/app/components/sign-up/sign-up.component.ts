import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDoNotMatch: true
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() })

  constructor(
    private authService: AuthenticationService,
    private router: Router, 
    private toastr: ToastrService){ }

 

  public async onSubmit(){

    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    if (await this.authService.signUp(name, email, password)){
      this.toastr.success('Successfully signed up!', 'Sign up completed')
      this.router.navigate(['/login']);
    } else {
      this.toastr.error('Please check username or password','Sign up Failed!');
       this.router.navigate(['/login']);
    }

 
  }
  

  ngOnInit(): void{  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

 
}




    /* this.authService
    .signUp(email, password)
    .pipe(
      switchMap(({ user: { uid } }) => 
      this.userService.addUser({ uid, email, displayName: name })
      ), 
      this.toast.observe({
        success:'Successfully signed up!', 
        loading: 'Completing sign up...', 
        error: ({ message }) => `${message}`,
      })
    )
    .subscribe(() => {
      this.router.navigate(['/home']);
    }) */


    /* this.authService.signUp(email, password)
    .then(result => {
      console.log('Signed up successfully!', result);
    })
    .catch(error => {
      console.error("Error during sign up: ", error);
    }); */