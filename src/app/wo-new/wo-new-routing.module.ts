import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WONEWPage } from './wo-new.page';

const routes: Routes = [
  {
    path: '',
    component: WONEWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WONEWPageRoutingModule {}
