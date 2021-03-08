import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInSellerPageRoutingModule } from './sign-in-seller-routing.module';

import { SignInSellerPage } from './sign-in-seller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInSellerPageRoutingModule
  ],
  declarations: [SignInSellerPage]
})
export class SignInSellerPageModule {}
