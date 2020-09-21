import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { channel_t } from 'src/app/models/channel';
import { stimulimits_t } from 'src/app/models/stimlimits';
import { stimulator_t } from 'src/app/models/stimulator';
import { StimServiceService } from 'src/app/stim-service.service';


function predicateBy(prop){
  return function(a,b){
     if (a[prop] > b[prop]){
         return 1;
     } else if(a[prop] < b[prop]){
         return -1;
     }
     return 0;
  }
}
@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
  

export class SetupPage implements OnInit {

  public stimulator = new stimulator_t();
  public temp_stim = new stimulator_t();

  public temp_stimlimits = new stimulimits_t();

  public knPW: {upper:number,lower:number};
  public knFreq: {upper:number,lower:number};
  public knAmp:  {upper:number,lower:number};
  public knChNum: number;
  public tIP;
  public tPatientID;
  public tStimKey;

  public validado = 0;
   

  constructor() { };
  //constructor(private activeteRoute: ActivatedRoute, private stimSrv :StimServiceService) { }

  ngOnInit() {
    /*
    this.knAmp = { upper: this.stimSrv.stimLims.AMPLimit, lower: this.stimSrv.stimLims.amplimit };
    this.knFreq = { upper: this.stimSrv.stimLims.FREQLimit, lower: this.stimSrv.stimLims.freqLimit };
    this.knAmp = { upper: this.stimSrv.stimLims.AMPLimit, lower: this.stimSrv.stimLims.amplimit };
    //this.knChNum = this.stimSrv.stimulator.channels.length;
    this.tIP = this.stimSrv.stimulator.ServerIP;
    this.tStimKey = this.stimSrv.stimulator.IdKey;
    this.tPatientID = this.stimSrv.stimulator.UserID;*/
  }
  validar() {
    
    this.temp_stimlimits.PWLimit = this.knPW.upper;
    this.temp_stimlimits.pwlimit = this.knPW.lower;

    this.temp_stimlimits.FREQLimit = this.knFreq.upper;
    this.temp_stimlimits.freqLimit = this.knFreq.lower;

    this.temp_stimlimits.AMPLimit = this.knAmp.upper;
    this.temp_stimlimits.amplimit = this.knAmp.lower;
    let val = this.validado;
    if (this.temp_stimlimits.validar() == 0)
      val = 1;
    alert("PW entre " + this.knPW.lower + " y " + this.knPW.upper+".\nValidado: "+val);
    this.validado = val;
    
  }
  guardar() {
    /*
    this.temp_stim.IdKey = this.tStimKey;
    this.temp_stim.UserID = this.tPatientID;
    //this.temp_stim.channels. = this.knChNum;
    this.stimSrv.stimulator.channels.sort(predicateBy("id"));
    while (this.stimSrv.stimulator.channels.length < this.knChNum)
      this.stimSrv.stimulator.channels.push(new channel_t());
    if (this.stimSrv.stimulator.channels.length > this.knChNum)
      this.stimSrv.stimulator.channels.length = this.knChNum;

    this.stimSrv.stimulator = this.temp_stim;
   
    this.stimSrv.stimLims = this.temp_stimlimits;
    */
  }
  reestablecer() {
    
  }

}
