import { Injectable } from '@angular/core';
import { channel_t } from './models/channel';
import { stimulimits_t } from './models/stimlimits';
import { stimulator_t } from './models/stimulator';

@Injectable({
  providedIn: 'root'
})
export class StimServiceService {
  public stimulator = new stimulator_t();
  public stimLims = new stimulimits_t();
  constructor() { 
    this.stimulator.IdKey = "";
    this.stimulator.ServerIP = "";
    this.stimulator.IdKey = "";
    let ch = new channel_t();
    this.stimulator.channels.push(ch);
  }
}
