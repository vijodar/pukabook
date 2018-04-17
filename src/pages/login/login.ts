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

  public type = 'password';
  public showPass = false;


  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  showPwd: boolean = false;
  pwdType: string = "password";
  pwdIcon: string = "md-eye-off";

  showHidePassword() {
    this.showPwd = !this.showPwd;

    if (this.showPwd) {
      this.pwdType = 'text';
      this.pwdIcon = 'md-eye';
    } else {
      this.pwdType = 'password';
      this.pwdIcon = 'md-eye-off';
    }
  }
}
