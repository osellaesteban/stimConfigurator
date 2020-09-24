import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stimulator_t } from 'src/app/models/stimulator';
import { StimServiceService } from 'src/app/stim-service.service';

@Component({
  selector: 'app-channel-config',
  templateUrl: './channel-config.page.html',
  styleUrls: ['./channel-config.page.scss'],
})
export class ChannelConfigPage implements OnInit {
  public stimulator: stimulator_t;
  public nChannels: number = 0;
  public validado: number = 0;
  public PW: number = 0;
  public Freq: number = 0;
  public Amp: number = 0;
  public selectedChannel: number = 0;
  public PWstep: number;
  public Freqstep: number;
  public Ampstep: number;

  constructor(private activeteRoute: ActivatedRoute, private stimSrv: StimServiceService) { }

  ngOnInit() {
    this.stimulator = this.stimSrv.get_stimulator();
    this.nChannels = this.stimulator.channels.length;
    if (this.nChannels)
      this.selectedChannel = this.stimulator.channels[0].id;
    this.PWstep = (this.stimulator.stimLims.PWLimit-this.stimulator.stimLims.pwlimit)/20;
    this.Freqstep = (this.stimulator.stimLims.FREQLimit-this.stimulator.stimLims.freqLimit)/20;
    this.Ampstep = (this.stimulator.stimLims.AMPLimit - this.stimulator.stimLims.amplimit) / 20;
    for (let k = 0; k < this.nChannels; k++)
      alert(this.stimulator.channels[k].id);
  }
  public ChannelSelect() {
    this.stimulator = this.stimSrv.get_stimulator();

    let chind = this.selectedChannel; // the index of the selected channel. It doesn't are nececssary in order.
    this.validado = 1;
    for (let ind = 0; ind < this.nChannels; ind++)
    {
      this.stimulator.channels[ind].id = ind;
      /*if (this.stimulator.channels[ind].id == this.selectedChannel) {
        chind = ind;
        this.validado = 1;
      }*/
    }
    if (this.validado == 1) {
      this.PW = this.stimulator.channels[chind].pulsewidth;
      this.Amp = this.stimulator.channels[chind].amplitude;
      this.Freq = this.stimulator.channels[chind].frequency;
    }
    else {
      alert("The channel couldn't be identified.\n Seleccionado :"+  this.selectedChannel + "Nombre: "+this.stimulator.channels[chind].id);
    }
  }

  public testear() {
    
  }

  public guardar() {
    this.stimulator.channels[this.selectedChannel].pulsewidth = this.PW;
    this.stimulator.channels[this.selectedChannel].amplitude = this.Amp;
    this.stimulator.channels[this.selectedChannel].frequency = this.Freq;
  }

  public reestablecer() {
    
  }

}
