import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersListComponent } from './components/computers-list/computers-list.component';
import { AddComputerComponent } from './components/add-computer/add-computer.component';// <== NEWLY ADDED LINE
import { EditComputerComponent } from './components/edit-computer/edit-computer.component'; // <== NEWLY ADDED LINE
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard, canActivate } from '@angular/fire/auth-guard';


const redirectToLoginPage = () => redirectUnauthorizedTo(['login']);
const redirectToHomePage = () => redirectLoggedInTo(['home']);
const redirectToComputers = () => redirectLoggedInTo(['computers']);

const routes: Routes = [
  //{ path: '', redirectTo: 'computers', pathMatch: 'full'},
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, ...canActivate(redirectToHomePage) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToLoginPage) },
  { path: 'login', component: LogInComponent, ...canActivate (redirectToHomePage) },
  { path: 'signup', component: SignUpComponent, ...canActivate (redirectToHomePage) },
  { path: 'computers', component: ComputersListComponent, ...canActivate (redirectToLoginPage) },
  { path: 'computers', component: ComputersListComponent },
  { path: 'computers/new', component: AddComputerComponent }, // <== NEWLY ADDED LINE
  { path: 'computers/edit/:id', component: EditComputerComponent } // <== NEWLY ADDED LINE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
