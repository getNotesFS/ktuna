import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsSellerPageRoutingModule } from './tabs-seller-routing.module';

import { TabsSellerPage } from './tabs-seller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsSellerPageRoutingModule
  ],
  declarations: [TabsSellerPage]
})
export class TabsSellerPageModule {}
