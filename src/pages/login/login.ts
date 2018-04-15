import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { OnHttpResponse } from '../../interfaces/onHttpResponse'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnHttpResponse {

  //regionConstructor
  constructor(public navCtrl: NavController) {
    
  }
  //end region
  
  //regionOnHttpResponse Interface
  onDataReceived(data) {
    throw new Error("Method not implemented.");
  }
  onErrorReceivingData(message: any) {
    throw new Error("Method not implemented.");
  }
  //end region
}
