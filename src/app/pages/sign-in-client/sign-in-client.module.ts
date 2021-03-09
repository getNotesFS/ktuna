import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInClientPageRoutingModule } from './sign-in-client-routing.module';

import { SignInClientPage } from './sign-in-client.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInClientPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SignInClientPage]
})
export class SignInClientPageModule {}
