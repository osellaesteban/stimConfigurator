import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelConfigPageRoutingModule } from './channel-config-routing.module';

import { ChannelConfigPage } from './channel-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelConfigPageRoutingModule
  ],
  declarations: [ChannelConfigPage]
})
export class ChannelConfigPageModule {}
