import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioClientPageRoutingModule } from './inicio-client-routing.module';

import { InicioClientPage } from './inicio-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioClientPageRoutingModule
  ],
  declarations: [InicioClientPage]
})
export class InicioClientPageModule {}
