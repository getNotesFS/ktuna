import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onResetPassword(email){
    try {

      await this.authSvc.resetPassword(email.value);
      this.router.navigate(['log-in']);
    } catch (error) {
      console.log("Error->",error);
    }
  }

}
