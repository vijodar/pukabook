import { UserDBProvider } from './../../providers/userdb/userdb';
import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { User } from './../../model/user';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, Input } from '@angular/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { TranslateService } from '@ngx-translate/core';
import { HasherProvider } from '../../providers/hasher/hasher';
import { NavController } from 'ionic-angular';
import { StartPage } from '../../pages/start/start';
import sha1 from 'js-sha1';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  public navCtrl: NavController
  //endregion INPUTS

  //region CONSTANTS
  private translateStrings = {
    "SIGN_IN_GOOGLE": "SIGN_IN_GOOGLE",
    "SIGN_IN_BUTTON": "SIGN_IN_BUTTON",
    "SIGN_IN_EMAIL_PLACEHOLDER": "SIGN_IN_EMAIL_PLACEHOLDER",
    "SIGN_IN_PASSWORD_PLACEHOLDER": "SIGN_IN_PASSWORD_PLACEHOLDER",
  }
  //endregion CONSTANTS

  //region PRIVATE_VARIABLES
  private showPwd: boolean = false;
  // Initialize Firebase
  //endregion PRIVATE_VARIABLES
  
  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"
  
  public signinEmail: string
  public signinPass: string
  
  public emailPlaceHolder: string
  public passwordPlaceHolder: string
  public loginBtnText: string
  public googleBtnText: string
  //endregion PUBLIC_VARIABLES
  
  //region CONST
  constructor(
    public rjs: RestClientProvider,
    public translate: TranslateService,
    public dialogError: ErrorDialogProvider,
    public userdb: UserDBProvider,
    public hasher: HasherProvider,) {

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
      this.navCtrl.setRoot(StartPage, {}, { animate: true, direction: 'forward' })
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

    this.translate.get(this.translateStrings.SIGN_IN_BUTTON)
    .subscribe(value => { this.loginBtnText = value })

    this.translate.get(this.translateStrings.SIGN_IN_EMAIL_PLACEHOLDER)
    .subscribe(value => { this.emailPlaceHolder = value })

    this.translate.get(this.translateStrings.SIGN_IN_GOOGLE)
    .subscribe(value => { this.googleBtnText = value })

    this.translate.get(this.translateStrings.SIGN_IN_PASSWORD_PLACEHOLDER)
    .subscribe(value => { this.passwordPlaceHolder = value })
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
