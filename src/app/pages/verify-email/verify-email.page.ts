import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  async onSendEmail():Promise<void> {
    try {
      this.authSvc.sendVerificationEmail();
    } catch (error) {
      console.log("Error->",error);
    }
  }

  ngOnDestroy(){
    this.authSvc.logout();
  }
}
