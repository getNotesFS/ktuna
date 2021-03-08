import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInClientPage } from './sign-in-client.page';

const routes: Routes = [
  {
    path: '',
    component: SignInClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInClientPageRoutingModule {}
