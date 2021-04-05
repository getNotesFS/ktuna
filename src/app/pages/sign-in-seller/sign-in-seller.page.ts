import { Component, OnInit } from '@angular/core'; 

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in-seller',
  templateUrl: './sign-in-seller.page.html',
  styleUrls: ['./sign-in-seller.page.scss'],
})
export class SignInSellerPage implements OnInit {

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        console.log('User->', user);
        //checkEmail
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log("Error->", error);
    }

  }


    //redirect user
    private redirectUser(isVerified:boolean):void{
      //redireect -> admin
      //else verificationPage
      if(isVerified){
        this.router.navigate(['tabs-seller/dashboard']);
      }else{
        this.router.navigate(['verify-email']);
      }
  
    }
}
