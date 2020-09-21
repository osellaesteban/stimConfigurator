import { channel_t } from './channel'

export class stimulator_t{
  public IdKey: string;
  public ServerIP: string;
  public UserID: number;
  public channels: Array<channel_t>;
  
}