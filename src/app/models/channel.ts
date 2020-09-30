
/**
 * class that models each channel
 */
export class channel_t{
  public id: number = 0;
  public frequency: number = 100;
  public pulsewidth: number = 10;
  public amplitude: number = 1;

  public validate(FREQLimit: number, freqLimit: number, PWLimit: number, pwlimit: number, AMPLimit: number, amplimit: number) {
    let result :number = 0;
    if (this.id < 0)
      result += 1;
    if (this.frequency < freqLimit)
      result += 2;
    if (this.frequency > FREQLimit)
      result += 4;
    if (this.pulsewidth < pwlimit)
      result += 8;
    if (this.pulsewidth > PWLimit)
      result += 16;
    if (this.amplitude < amplimit)
      result += 32;
      if (this.amplitude >AMPLimit)
      result += 64;
    return result;
  };

  public compare_chNum(a:channel_t,b:channel_t) {
    return a.id-b.id;
  };

  public getJson() {
    let msg: string = "{\"channel\":" + this.id + ",\"frequency\":" +
      this.frequency + ",\"pulsewidth\":" + this.pulsewidth + ",\"current\":"
      + this.amplitude + "}\n";
    return msg;
  }
  
  public constructor() {
    
  };
}

