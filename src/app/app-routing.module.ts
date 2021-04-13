import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './interfaces/auth.guard';

const routes: Routes = [
   
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
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
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'tabs-seller',
    loadChildren: () => import('./pages/tabs-seller/tabs-seller.module').then( m => m.TabsSellerPageModule),
    canActivate:[AuthGuard],
  },
  
  {
    path: 'seller-profile',
    loadChildren: () => import('./pages/seller-profile/seller-profile.module').then( m => m.SellerProfilePageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./pages/client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
  },
  {
    path: 'my-store',
    loadChildren: () => import('./pages/my-store/my-store.module').then( m => m.MyStorePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'new-product',
    loadChildren: () => import('./pages/new-product/new-product.module').then( m => m.NewProductPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
