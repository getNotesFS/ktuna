import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsClientPageRoutingModule } from './tabs-client-routing.module';

import { TabsClientPage } from './tabs-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsClientPageRoutingModule
  ],
  declarations: [TabsClientPage]
})
export class TabsClientPageModule {}
