import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        //Todo: check email verificado
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log("VERIFICADO->", isVerified);
      }
    } catch (error) {
      console.log("Error->", error);
    }
  }


  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        //Todo: CheckEmail
        console.log("User->", user);
        // this.router.navigate(['verify-email']);

        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);

      }
    } catch (error) {
      console.log("Error->", error);
    }


  }
  async onLoginFacebook() {
    try {
      const user = await this.authSvc.loginFacebook();
      if (user) {
        //Todo: CheckEmail
        console.log("user->", user);
        // this.router.navigate(['verify-email']);

        const isVerified = this.authSvc.isEmailVerified(user); 
    
        this.redirectUser(isVerified);

      }
    } catch (error) {
      console.log("Error->", error);
    }
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
