import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { stimulator_t } from '../models/stimulator';
import { StimServiceService } from '../stim-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bt: BluetoothSerial, private stimSrv: StimServiceService) { }
  public dis;
  public stimulator = this.stimSrv.get_stimulator();
  public async onClick() {
    try{
      await this.bt.isEnabled();
      alert("Esta enabled");
      this.listaDisp();
    } catch (e) {
      alert(e);
    }
  }
  public async listaDisp() {
    this.dis = await this.bt.list();
    
  }
  // poner un metodo como para que, en el click, 
  // guardar el mac y debajo, otro boton, para subir la info al dispositivo.
  public establecerMAC(address) {
    this.stimulator.IdKey = address;
    
  }

  public uploadToStim()
  {
    this.stimulator = this.stimSrv.get_stimulator();
    let msj = this.stimulator.getJson();
    alert("Mensaje a enviar:\n" + msj);
    this.bt.connect(this.stimulator.IdKey).subscribe(res => {
      this.stimulator = this.stimSrv.get_stimulator();    
      this.bt.write(msj);
      this.bt.disconnect();
    }, error => {
        alert(error);
    });
  }


}
