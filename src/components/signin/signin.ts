import { UserDBProvider } from './../../providers/userdb/userdb';
import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { User } from './../../model/user';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component } from '@angular/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { HasherProvider } from '../../providers/hasher/hasher';
import sha1 from 'js-sha1';


@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent implements OnHttpResponse {

  //region PRIVATE_VARIABLES
  private showPwd: boolean = false;
  // Initialize Firebase
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"

  public signinEmail: string
  public signinPass: string
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public rjs: RestClientProvider,
    public storage: Storage,
    public translate: TranslateService,
    public dialogError: ErrorDialogProvider,
    public userdb: UserDBProvider,
    public hasher: HasherProvider,) {

    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data)
    var result = data.result
    if (result.auth) {
      console.log("Signin");
      var user: User = <User>result.userinfo
      user.token = result.t
      this.userdb.removeUser()
      this.userdb.addUser(user)
    } else {
      this.onErrorReceivingData(1)
    }
  }
  onErrorReceivingData(message: number) {
    this.dialogError.showErrorDialog(message)
  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  public eventHandler(keyCode) {
    if (keyCode.keyCode == 13) {
      this.showHidePassword()
      this.signInButton()
    }
  }

  public showHidePassword() {
    this.showPwd = !this.showPwd;
    if (this.showPwd) {
      this.pwdType = 'text'
      this.pwdIcon = 'md-eye'
    } else {
      this.pwdType = 'password'
      this.pwdIcon = 'md-eye-off'
    }
  }

  public signInButton() {
    // console.log(this.hasher.encrypt(this.signinEmail),
    //   this.hasher.decrypt("U2FsdGVkX18112X1bpPYhYbPpstfad/AccoQOZMU/KI="));

    if (this.checkEmailField() && this.checkPassField()) {
      var userpass = btoa(this.hasher.encrypt(this.signinEmail) + ":" + sha1(this.signinPass))
      var header = "Basic " + userpass
      this.rjs.doRequest("POST", "login", header, this)
    }
  }

  //endregion PUBLIC_METHODS

  //region PRIVATE_METHODS
  private starter() {
    this.signinEmail = ""
    this.signinPass = ""
  }

  private checkEmailField(): boolean {
    if (this.signinEmail.length > 0) {
      if (this.signinEmail.match(/^(\w|[_.])+\@[a-z]+\.[a-z]+/)) {
        return true
      } else {
        this.dialogError.showErrorDialog(3)
      }
    } else {
      this.dialogError.showErrorDialog(2)
    }
    return false
  }

  private checkPassField(): boolean {
    if (this.signinPass.length > 0) {
      return true
    } else {
      this.dialogError.showErrorDialog(4)
    }
    return false
  }
  //endregion PRIVATE_METHODS
}
