import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'type-login',
    loadChildren: () => import('./pages/type-login/type-login.module').then( m => m.TypeLoginPageModule)
  },
  {
    path: 'sign-in-client',
    loadChildren: () => import('./pages/sign-in-client/sign-in-client.module').then( m => m.SignInClientPageModule)
  },
  {
    path: 'sign-in-seller',
    loadChildren: () => import('./pages/sign-in-seller/sign-in-seller.module').then( m => m.SignInSellerPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
