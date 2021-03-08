import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeLoginPageRoutingModule } from './type-login-routing.module';

import { TypeLoginPage } from './type-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeLoginPageRoutingModule
  ],
  declarations: [TypeLoginPage]
})
export class TypeLoginPageModule {}
