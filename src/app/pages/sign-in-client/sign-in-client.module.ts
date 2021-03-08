import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInClientPageRoutingModule } from './sign-in-client-routing.module';

import { SignInClientPage } from './sign-in-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInClientPageRoutingModule
  ],
  declarations: [SignInClientPage]
})
export class SignInClientPageModule {}
