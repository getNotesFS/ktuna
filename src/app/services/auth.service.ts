import { Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { DbfirebaseService } from './dbfirebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //observable
  public user$: Observable<User>;
  cUser: User;
  myUID:string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private dbfirebase: DbfirebaseService) {

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
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      //TODO verificar existencia de usuario

      this.updateUserData(user);
      return user;


    } catch (error) {
      console.log('Error->', error);
    }
  }


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
      this.updateUserDataVendedor(user);
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
  isCliente(user: User): boolean {
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
      ci: '',
      roles: {
        cliente: true
      },
      tienda: {
        nombre: '',
        photoURL: '',
        productoVenta: '',
        descripcion: '',
        direccion: '',
        telefono: ''
      }
    };

    return userRef.set(data, { merge: true });
  }

  private updateUserDataVendedor(user) {
    //set datya to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      roles: {
        cliente: true
      }
    };

    return userRef.set(data, { merge: true });
  }


  //status user
  async getUid() {
    const user = await this.afAuth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  stateAuth() {
    return this.afAuth.authState;
  }

  async getInfoUser() {
    const uid = await this.getUid();
    const path = 'users';
    this.dbfirebase.getDoc<User>(path, uid).subscribe(res => {
      if (res !== undefined) {
        this.cUser = res;
        // console.log('datosCliente ->' , this.datosCliente);
      }
    });
  }

  async getInfoUserUID() {
    const uid = await this.getUid();
    const path = 'users';
    this.dbfirebase.getDoc<User>(path, uid).subscribe(res => {
      if (res !== undefined) {
        this.myUID = res.uid;
        // console.log('datosCliente ->' , this.datosCliente);
      }
    });
  }
  getUser() {
    // Return the observable. DO NOT subscribe here.
    return this.afAuth.user;
    // Hint: you could also transform the value before returning it:
    // return this.af.auth.map(authData => new User({name: authData.name}));
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
