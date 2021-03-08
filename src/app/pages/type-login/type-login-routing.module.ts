import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeLoginPage } from './type-login.page';

const routes: Routes = [
  {
    path: '',
    component: TypeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeLoginPageRoutingModule {}
