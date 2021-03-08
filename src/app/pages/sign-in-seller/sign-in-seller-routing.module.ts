import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInSellerPage } from './sign-in-seller.page';

const routes: Routes = [
  {
    path: '',
    component: SignInSellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInSellerPageRoutingModule {}
