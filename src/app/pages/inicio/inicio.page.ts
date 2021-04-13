
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user: User;
  constructor(private afs: AngularFirestore, public auth: AuthService, private router: Router) { }

  ngOnInit() {
/*
    this.auth.user$.subscribe(user => this.user = user);

    if (!this.auth.isCliente(this.user)) {
      this.router.navigate(['welcome']);
    }*/
  }



}
