import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Angular Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth} from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputersListComponent } from './components/computers-list/computers-list.component';
import { ComputerFormComponent } from './components/computer-form/computer-form.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComputerComponent } from './components/add-computer/add-computer.component';
import { EditComputerComponent } from './components/edit-computer/edit-computer.component'; // <== NEWLY ADDED LINE
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'; 
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './components/side-nav/side-nav.component';





@NgModule({
  declarations: [
    AppComponent,
    ComputersListComponent,
    ComputerFormComponent,
    AddComputerComponent,
    EditComputerComponent,
    LogInComponent,
    HomeComponent,
    LandingComponent,
    SignUpComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // <== NEWLY ADDED LINE

    //NEWLY ADDED CODE FOR ANGULAR MATERIALS
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, BrowserAnimationsModule, 
    MatMenuModule,
    MatSidenavModule, 
    MatListModule,

    // FOR FIREBASE
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),

    //FOR TOASTR
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center', 
      preventDuplicates: true,
    }),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
