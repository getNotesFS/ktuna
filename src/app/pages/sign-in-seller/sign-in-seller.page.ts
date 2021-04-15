import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';

@Component({
  selector: 'app-sign-in-seller',
  templateUrl: './sign-in-seller.page.html',
  styleUrls: ['./sign-in-seller.page.scss'],
})
export class SignInSellerPage implements OnInit {

  vendedor: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
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
  uid = '';
  password: any;
  newFile: any;
  newFile2: any;
  suscriberUserInfo: Subscription;

  constructor(private authSvc: AuthService,
    private router: Router,
    private firestorageService: FirestorageService,
    private firestoreService: DbfirebaseService) { }

  ngOnInit() {
  }

  async onRegister() {
    try {
      const user = await this.authSvc.register(this.vendedor.email, this.password);
      if (user) {
        console.log('User->', user);
        //checkEmail
        const uid = await this.authSvc.getUid();
        this.vendedor.uid = uid;
        this.guardarUser();

        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log("Error->", error);
    }

  }
  //SUBIR IMAGEN
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.vendedor.photoURL = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  async newImageUpload2(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile2 = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.vendedor.tienda.photoURL = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  //guardar
  async guardarUser() {
    const path = 'users';
    const path2 = 'users/logotienda';

    const name = this.vendedor.displayName;
    const name2 = this.vendedor.tienda.nombre;

    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.vendedor.photoURL = res;
    }
    if (this.newFile2 !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile2, path2, name2);
      this.vendedor.tienda.photoURL = res;
    }

    this.firestoreService.createDoc(this.vendedor, path, this.vendedor.uid).then(res => {
      console.log('guardado con exito');
    }).catch(error => {
    });
  }


  //redirect user
  private redirectUser(isVerified: boolean): void {
    //redireect -> admin
    //else verificationPage
    if (isVerified) {
      this.router.navigate(['tabs-seller/dashboard']);
    } else {
      this.router.navigate(['verify-email']);
    }

  }
}
