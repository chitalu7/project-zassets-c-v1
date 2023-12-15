import { Component, signal} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor(public authService: AuthenticationService, private router: Router){

  }

  isLoggedIn(){
    return this.authService.currentUser$;
  }


  logout() {
    this.authService.logout().subscribe(() => {

      this.router.navigate(['']);

    });
  }

  navToDashboard(){
    this.router.navigate(['home']);
  }

  navToComputers(){
    this.router.navigate(['/computers']);
  }

 }

