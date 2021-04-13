import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  //user:User;
  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onSendEmail():Promise<void> {
    try {
      this.authSvc.sendVerificationEmail();
      this.router.navigate(['log-in']);
    } catch (error) {
      console.log("Error->",error);
    }
  }

  ngOnDestroy(){
    this.authSvc.logout();
  }
}
