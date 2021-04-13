import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsSellerPage } from './tabs-seller.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tabs-seller/dashboard',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsSellerPage,
    children:[
     {
      path: 'dashboard',
      loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
     }
    ]
  },
  {
    path: '',
    component: TabsSellerPage,
    children:[
     {
      path: 'my-store',
      loadChildren: () => import('../my-store/my-store.module').then( m => m.MyStorePageModule)
     }
    ]
  }
  ,
  {
    path: '',
    component: TabsSellerPage,
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
    component: TabsSellerPage,
    children:[
     {
      path: 'new-product',
      loadChildren: () => import('../new-product/new-product.module').then( m => m.NewProductPageModule)
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsSellerPageRoutingModule {}
