
/**
 * class that models each channel
 */
export class channel_t{
  public id: number;
  public frequency: number;
  public pulsewidth: number;
  public amplitude: number;

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
  
  public constructor() {
    
  };
}

