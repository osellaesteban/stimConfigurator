export class stimulimits_t {
  public FREQLimit: number;
  public freqLimit: number;
  public PWLimit: number;
  public pwlimit: number;
  public AMPLimit: number;
  public amplimit: number;

  constructor() {
    this.AMPLimit = 250;
    this.amplimit = 20;
    this.FREQLimit = 100;
    this.freqLimit = 10;
    this.PWLimit = 80;
    this.pwlimit = 10;
  };

  public validar() { 
    let res = 0;
    if (this.FREQLimit < this.freqLimit)
      res += 1;
    if (this.PWLimit < this.pwlimit)
      res += 2;
    if (this.AMPLimit < this.amplimit)
      res += 4;
    if (res == 0)
 
    return res;
  };
}
