import { User } from './../../poto/user';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component } from '@angular/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent implements OnHttpResponse {

  //region PRIVATE_VARIABLES
  private showPwd: boolean = false
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"

  public email: any
  public pass: any

  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public rjs: RestClientProvider, public storage: Storage, public translate: TranslateService) {
    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data)
    var result = data.result
    if (result.auth) {
      console.log("Signin");
      var user = new User({
        email: this.email,
        pass: this.pass,
        token: result.t
      })
      this.storage.set("user", user)
    } else {
      console.log("Signin error");

    }
  }
  onErrorReceivingData(message: any) {
    throw new Error("Method not implemented.")
  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  private starter() {
    this.email = ""
    this.pass = ""
  }

  eventHandler(keyCode) {
    if (keyCode.keyCode == 13) {
      this.showHidePassword()
      this.signInButton()
    }
  }

  showHidePassword() {
    this.showPwd = !this.showPwd;

    if (this.showPwd) {
      this.pwdType = 'text'
      this.pwdIcon = 'md-eye'
    } else {
      this.pwdType = 'password'
      this.pwdIcon = 'md-eye-off'
    }
  }

  signInButton() {
    var userpass = btoa(this.email + ":" + this.pass)
    var auth = "Basic " + userpass
    console.log(auth);

    this.rjs.doRequest("GET", "login", auth + "", this)
  }
  //endregion PUBLIC_METHODS
}
