import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss'],
})
export class Header2Component implements OnInit {
  public user$: Observable<User> = this.authSvc.afAuth.user;

  @Input() titulo: string = "";
  constructor(private authSvc: AuthService) { }

  ngOnInit() {}

  onSigninOut2(){
    this.authSvc.logout();
  }
}
