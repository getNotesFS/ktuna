import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsSellerPage } from './tabs-seller.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tabs/inicio',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsSellerPage,
    children:[
     {
      path: 'inicio',
      loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsSellerPageRoutingModule {}
