import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map(user=>{
       // console.log("User existe->",user);

        if(user && user.emailVerified && user.roles.cliente){
          return true;
        }else if(user && !user.emailVerified){
          this.router.navigate(['verify-email']);
          return false;
        }else{
          //redirigir
          this.router.navigate(['log-in']);
          return false;
        }
      })
    );

  }
  
}
