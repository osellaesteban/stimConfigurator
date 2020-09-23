import { channel_t } from './channel'
import { stimulimits_t } from './stimlimits';

export class stimulator_t{
  public IdKey: string;
  public ServerIP: string;
  public UserID: number;
  public stimLims = new stimulimits_t()
  public channels: Array<channel_t>;  
  constructor() {
    //this.channels[1] = new channel_t();
  }
}