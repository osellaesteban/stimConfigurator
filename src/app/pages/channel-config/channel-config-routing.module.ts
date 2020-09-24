import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelConfigPage } from './channel-config.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelConfigPageRoutingModule {}
