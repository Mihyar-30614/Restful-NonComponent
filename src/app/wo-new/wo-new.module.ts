import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WONEWPageRoutingModule } from './wo-new-routing.module';

import { WONEWPage } from './wo-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WONEWPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WONEWPage]
})
export class WONEWPageModule {}
