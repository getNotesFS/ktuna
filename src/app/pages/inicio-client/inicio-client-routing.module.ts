import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioClientPage } from './inicio-client.page';

const routes: Routes = [
  {
    path: '',
    component: InicioClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioClientPageRoutingModule {}
