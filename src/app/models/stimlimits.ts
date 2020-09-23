export class stimulimits_t {
  public FREQLimit: number;
  public freqLimit: number;
  public PWLimit: number;
  public pwlimit: number;
  public AMPLimit: number;
  public amplimit: number;

  constructor() {
    this.AMPLimit = 10;
    this.amplimit = 0;
    this.FREQLimit = 10;
    this.freqLimit = 0;
    this.PWLimit = 10;
    this.pwlimit = 0;
  };

  public validar() { 
    let res = 0;
    if (this.FREQLimit < this.freqLimit)
      res += 1;
    if (this.PWLimit < this.pwlimit)
      res += 2;
    if (this.AMPLimit < this.amplimit)
      res += 4;
    return res;
  };
}
