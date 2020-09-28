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

  /** "{\"PatientID\":\"30412884\",\"stimConfigs\":[{\"channel\":0,\"frequency\":1000,\"pulsewidth\":100,\"current\":300},{\"channel\":1,\"frequency\":1000,\"pulsewidth\":100,\"current\":300},{\"channel\":2,\"frequency\":1000,\"pulsewidth\":100,\"current\":300},{\"channel\":3,\"frequency\":1000,\"pulsewidth\":100,\"current\":300},{\"channel\":4,\"frequency\":1000,\"pulsewidth\":100,\"current\":300},{\"channel\":5,\"frequency\":1000,\"pulsewidth\":100,\"current\":300}]}";
 */
  public getJson() {
    let msg: string = "{\"PatientID:\"" + this.UserID + ",\"stimConfigs:[";
    for (let k = 0; k < this.channels.length; k++)
    {
      msg += "{\"channel\":" + this.channels[k].id;
      msg += ",\"frequency\":" + this.channels[k].frequency;
      msg += ",\"pulsewidth\":" + this.channels[k].pulsewidth;
      msg += ",\"current\":" + this.channels[k].amplitude + "},";
    }
    msg += "]}";
    return msg;
  }
}