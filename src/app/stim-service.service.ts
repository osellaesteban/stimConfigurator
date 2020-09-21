import { Injectable } from '@angular/core';
import { channel_t } from './models/channel';
import { stimulimits_t } from './models/stimlimits';
import { stimulator_t } from './models/stimulator';

@Injectable({
  providedIn: 'root'
})
export class StimServiceService {
  public stimulator = new stimulator_t();
;
  constructor() { 
    this.stimulator.IdKey = "";
    this.stimulator.ServerIP = "";
    this.stimulator.IdKey = "";
    let ch = new channel_t();
    this.stimulator.channels = [ch];  // si le doy push aca la caga.
  };
  public get_stimulator()
  {
    return this.stimulator;
  }
  public getLimits() {
    return this.stimulator.stimLims;
  }
}
