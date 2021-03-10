import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/tabs-seller/tabs-seller.module').then( m => m.TabsSellerPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
