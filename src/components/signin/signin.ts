import { UserDBProvider } from './../../providers/userdb/userdb';
import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { User } from './../../model/user';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, ViewChild, Input } from '@angular/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { TranslateService } from '@ngx-translate/core';
import { HasherProvider } from '../../providers/hasher/hasher';
import { Platform, NavController } from 'ionic-angular';
import { StartPage } from '../../pages/start/start';
import sha1 from 'js-sha1';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent implements OnHttpResponse {

  @Input()
  private navCtrl: NavController

  //region PRIVATE_VARIABLES
  private showPwd: boolean = false
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"

  public signinEmail: string
  public signinPass: string

  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(
    public rjs: RestClientProvider,
    public translate: TranslateService,
    public dialogError: ErrorDialogProvider,
    public userdb: UserDBProvider,
    public hasher: HasherProvider) {

    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.auth) {
      var user: User = <User>result.userinfo
      user.token = result.t
      this.userdb.addUser(user)
      this.navCtrl.setRoot(StartPage, {}, { animate: true, direction: 'forward' });
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
    this.userdb.removeUser()
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
