import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState, UserCredential, updateProfile } from '@angular/fire/auth';
import { from, Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = false;

  currentUser$ = this.afAuth.authState;
  
  constructor(public auth: Auth, public afAuth: AngularFireAuth) { }

   
    async login(username: string, password: string): Promise<boolean> {
      try {
        await this.afAuth.signInWithEmailAndPassword(username, password);
        this.isLoggedIn = true;
        return true; // Authentication successful
      } catch (error) {
        console.error('Authentication failed: ', error);
        return false; // Authentication failed
      }
    }

   

    async signUp(name: string, email: string, password: string): Promise<boolean> {
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        return true; 
      } catch (error) {
        console.error('Error signing up: ', error);
        throw error;
      }
    }


    // NO ERROR SIGN UP CODE
    /* async signUp(email: string, password: string): Promise<any> {
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        return result; 
      } catch (error) {
        console.error('Error signing up: ', error);
        throw error;
      }
    } */


   logout(){
    this.isLoggedIn = false;
    return from(this.auth.signOut());
   }
/* 
   signUp(name: string, username: string, password: string){
    return from(
      this.afAuth.createUserWithEmailAndPassword(username, password))
      .pipe(switchMap(({ user }) => updateProfile(user, {displayName: name}));
    )
     */
    
    /* return from (this.afAuth.createUserWithEmailAndPassword(username, password))
    .pipe
    
    .switchMap(({ user }) => updateProfile(user, { displayName: name})) 

   }*/



}




/* 
  login(username: string, password: string){
    return from (signInWithEmailAndPassword(this.auth, username, password)); //returns an obersable
   } */