import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { Header2Component } from './header2/header2.component';



@NgModule({
  declarations: [
    HeaderComponent,
    Header2Component
  ],
  exports: [
    HeaderComponent,
    Header2Component
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
