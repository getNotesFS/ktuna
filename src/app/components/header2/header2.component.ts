import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss'],
})
export class Header2Component implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  usuario: User;
  anyu: any;
  @Input() titulo: string = "";
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
  ngOnInit() {}

  onSigninOut2(){
    this.authSvc.logout();
  }
}
