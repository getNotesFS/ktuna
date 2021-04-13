import { Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //observable
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    //get auth data
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )

  }



  //async registerClient():Promise<User>{}

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);

    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<any> {
    try {
      const  {user} = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
     

    } catch (error) {
      console.log('Error->', error);
    }
  }

/*
  loginGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);

  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  */

  async loginFacebook(): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //verify email validation
  isEmailVerified(user: User) {
    return user.emailVerified === true ? true : false;

  }

  //is cliente
  isCliente(user: User):boolean {
    const allowed = ['cliente'];
    return this.checkAuthorization(user, allowed);

  }
  //logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);

    }
  }


  //privado
  private updateUserData(user) {
    //set datya to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        cliente: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  


  //ability methods
  canRead(user: User): boolean {
    const allowed = ['admin', 'vendedor', 'cliente'];
    return this.checkAuthorization(user, allowed);

  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'vendedor'];
    return this.checkAuthorization(user, allowed);

  }
  canDelete(user: User): boolean {
    const allowed = ['admin', 'vendedor'];
    return this.checkAuthorization(user, allowed);

  }

   
  //check user matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }


}
