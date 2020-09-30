import { FnParam } from '@angular/compiler/src/output/output_ast';
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

  //public stimulator = new stimulator_t();
  public temp_stim = new stimulator_t();
  //public stLimits: stimulimits_t;

  public knPW: {upper:number,lower:number};
  public knFreq: {upper:number,lower:number};
  public knAmp:  {upper:number,lower:number};
  public knChNum: number;
  public tIP: string;
  public tPatientID;
  public tStimKey: string;

  public validado = 0;
   

  //constructor() { };
  constructor(private activeteRoute: ActivatedRoute, private stimSrv: StimServiceService) {
    this.knPW = {upper:80,lower:20};
    this.knFreq = {upper:100,lower:20};
    this.knAmp = {upper:250,lower:10};
    this.knChNum = 1;
    this.tIP = "";
    this.tPatientID = "";
    this.tStimKey = "";
   }

  public ngOnInit() {
    this.temp_stim = this.stimSrv.get_stimulator();
    
    this.knFreq.upper = this.temp_stim.stimLims.FREQLimit;
    this.knFreq.lower = this.temp_stim.stimLims.freqLimit;
    
    this.knAmp.upper = this.temp_stim.stimLims.AMPLimit;
    this.knAmp.lower = this.temp_stim.stimLims.amplimit;
    
    this.knPW.upper = this.temp_stim.stimLims.PWLimit;
    this.knPW.lower = this.temp_stim.stimLims.pwlimit;

    this.knChNum = this.temp_stim.channels.length;

    this.tIP = this.temp_stim.ServerIP;

    this.tStimKey = this.temp_stim.IdKey;
    
    this.tPatientID = this.temp_stim.UserID;
  }
  public changed() {
    this.validado = 0;
  }
  public validar() {
    
    this.temp_stim.stimLims.PWLimit = this.knPW.upper;
    this.temp_stim.stimLims.pwlimit = this.knPW.lower;

    this.temp_stim.stimLims.FREQLimit = this.knFreq.upper;
    this.temp_stim.stimLims.freqLimit = this.knFreq.lower;

    this.temp_stim.stimLims.AMPLimit = this.knAmp.upper;
    this.temp_stim.stimLims.amplimit = this.knAmp.lower;
    
    this.temp_stim.IdKey = this.tStimKey;
    this.temp_stim.UserID = this.tPatientID;
    this.temp_stim.ServerIP = this.tIP;

    let val = this.validado;
    if ((this.temp_stim.stimLims.validar() == 0) && (this.temp_stim.IdKey.length !=0)&& (this.temp_stim.UserID !=NaN))
      val = 1;
    //alert("PW entre " + this.knPW.lower + " y " + this.knPW.upper+".\nValidado: "+val);
    this.validado = val;
    
  }
  public guardar() {
    
    this.temp_stim.IdKey = this.tStimKey;
    this.temp_stim.UserID = this.tPatientID;
    
    if (this.temp_stim.channels.length)
      this.temp_stim.channels.sort(predicateBy("id"));
    while (this.temp_stim.channels.length < this.knChNum)
      this.temp_stim.channels.push(new channel_t());
    if (this.temp_stim.channels.length > this.knChNum)
      this.temp_stim.channels.length = this.knChNum;
    for (let id = 0; id < this.temp_stim.channels.length; id++) {
      this.temp_stim.channels[id].id = id;
    }
    if (this.validado)
      {
      this.stimSrv.set_stimulator(this.temp_stim);
    }
  }
  
  public reestablecer() {
    this.ngOnInit();
    location.reload()
    
  }

}
