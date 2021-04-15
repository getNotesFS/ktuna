import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';  
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.page.html',
  styleUrls: ['./seller-profile.page.scss'],
})
export class SellerProfilePage implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router:Router) { }
 

  ngOnInit(){ 
  }

}
