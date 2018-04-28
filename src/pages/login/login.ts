import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { OnHttpResponse } from '../../interfaces/onHttpResponse'
import { RestClient } from '../../providers/rest-client/restClient';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnHttpResponse {

  signinStatus: String
  signupStatus: String

  //region CONST
  constructor(public navCtrl: NavController, public rjs: RestClient) {
    this.signinStatus = "signinShow"
    this.signupStatus = "signupHide"
  }
  //endegion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data);


  }
  onErrorReceivingData(message: any) {
    throw new Error("Method not implemented.");
  }
  //endregion ONHTTPRESPONSE

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

  tapButton() {
    this.rjs.prepareRequest("", "", this)
    this.rjs.doRequest("GET")
  }

  switchForm() {
    this.signinStatus = this.signinStatus == "signinHide" ? "signinShow" : "signinHide"
    this.signupStatus = this.signupStatus == "signupHide" ? "signupShow" : "signupHide"
  }

  eventHandler(keyCode) {
    if (keyCode.keyCode == 13) {
      this.showHidePassword()
      this.tapButton()
    }
  }
}
