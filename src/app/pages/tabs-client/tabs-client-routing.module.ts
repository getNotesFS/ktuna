import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsClientPage } from './tabs-client.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tabs-client/dashboard',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsClientPage,
    children:[
      {
       path: 'dashboard',
       loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      }
     ]
  },
  {
    path: '',
    component: TabsClientPage,
    children:[
     {
      path: 'orders',
      loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
     }
    ]
  } 
  ,
  {
    path: '',
    component: TabsClientPage,
    children:[
     {
      path: 'perfil-cliente',
      loadChildren: () => import('../client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
     }
    ]
  } 
  ,
  {
    path: '',
    component: TabsClientPage,
    children:[
     {
      path: 'store',
      loadChildren: () => import('../store/store.module').then( m => m.StorePageModule)
     }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsClientPageRoutingModule {}
