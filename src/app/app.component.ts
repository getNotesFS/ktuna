import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { DbfirebaseService } from './services/dbfirebase.service';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  usuario: User;
  anyu: any;
  constructor(private authSvc: AuthService, private firestoreService: DbfirebaseService, private router: Router, private menu: MenuController) {

    const path = 'users';
    this.user$.subscribe(auth => {
      console.log('datosCliente ->', auth.uid);
       
      this.firestoreService.getDoc<User>(path, auth.uid).subscribe(res => {
        if (res !== undefined) {
          this.usuario = res;
          console.log('datosCliente ->' , this.usuario);
        }
  
      });
    });


  
  }
  ngOnInit() {
    //this.getProductos(); 
  }

  onSigninOut() {
    this.authSvc.logout();
    this.menu.close(); 
    this.router.navigate(['/log-in']); 
     
  }

  getTienda(tiendaID: string) {
    console.log("My product id is: ", this.anyu);
    const path = 'users';
    this.firestoreService.getDoc<User>(path, tiendaID).subscribe(res => {
      if (res !== undefined) {
        this.usuario = res;
        console.log('datosCliente ->', this.usuario);
      }

    });

  }

}
