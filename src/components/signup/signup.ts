import { HasherProvider } from './../../providers/hasher/hasher';
import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { Component, Input } from '@angular/core';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { TranslateService } from '@ngx-translate/core';
import sha1 from 'js-sha1';
import { ToastController, Toast } from 'ionic-angular';
import { OnCreateNewUserResponse } from '../../interfaces/onCreateNewUserResponse';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  onCreateUser: OnCreateNewUserResponse
  //endregion INPUTS

  //region CONSTANTS
  private translateStrings = {
    "SIGN_UP_EMAIL_PLACEHOLDER": "SIGN_UP_EMAIL_PLACEHOLDER",
    "SIGN_UP_PASSWORD_PLACEHOLDER": "SIGN_UP_PASSWORD_PLACEHOLDER",
    "SIGN_UP_PASSWORD2_PLACEHOLDER": "SIGN_UP_PASSWORD2_PLACEHOLDER",
    "SIGN_UP_BUTTON": "SIGN_UP_BUTTON",
    "SIGN_UP_CORRECT": "SIGN_UP_CORRECT",
    "SIGN_UP_INCORRECT": "SIGN_UP_INCORRECT",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public signupEmail: string
  public signupPass1: string
  public signupPass2: string

  public emailPlaceholder: string
  public passPlaceholder: string
  public passAPlaceholder: string
  public signupBtnText: string
  //endregion PUBLIC_VARIABLES

  //region PRIVATE_VARIAVLES
  private toast: Toast

  private registerMsg: string
  private notRegisterMsg: string
  //endregion PRIVATE_VARIAVLES

  //region CONST
  constructor(
    private rjs: RestClientProvider,
    private dialogError: ErrorDialogProvider,
    private translate: TranslateService,
    private hasher: HasherProvider,
    private toastCtrl: ToastController) {

    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.register) {
      this.toast.setMessage(this.registerMsg)
      this.onCreateUser.onCreateUser()
    } else {
      this.toast.setMessage(this.notRegisterMsg)
    }
    this.toast.present()
  }
  onErrorReceivingData(message: number) {
    console.log("NOT REGISTERED");

  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  public signUpButton() {
    if (this.checkEmailField() && this.checkPassField()) {
      var userpass = btoa(this.hasher.encrypt(this.signupEmail) + ":" + sha1(this.signupPass1))
      var auth = "Basic " + userpass
      var username = this.hasher.encrypt(this.signupEmail.split("@")[0])

      this.rjs.doRequest("POST", "register", auth + "", this, { username: username })
    }
  }
  //endregion PUBLIC_METHODS

  //region PRIVATE_METHODS
  private starter() {
    this.signupEmail = ""
    this.signupPass1 = ""
    this.signupPass2 = ""

    this.translate.get(this.translateStrings.SIGN_UP_BUTTON)
      .subscribe(value => { this.signupBtnText = value })

    this.translate.get(this.translateStrings.SIGN_UP_EMAIL_PLACEHOLDER)
      .subscribe(value => { this.emailPlaceholder = value })

    this.translate.get(this.translateStrings.SIGN_UP_PASSWORD_PLACEHOLDER)
      .subscribe(value => { this.passPlaceholder = value })

    this.translate.get(this.translateStrings.SIGN_UP_PASSWORD2_PLACEHOLDER)
      .subscribe(value => { this.passAPlaceholder = value })

    this.translate.get(this.translateStrings.SIGN_UP_CORRECT)
      .subscribe(value => { this.registerMsg = value })

    this.translate.get(this.translateStrings.SIGN_UP_INCORRECT)
      .subscribe(value => { this.notRegisterMsg = value })


    this.toast = this.toastCtrl.create({
      position: 'top',
      duration: 3000,
    })
  }

  private checkEmailField(): boolean {
    if (this.signupEmail.length > 0) {
      if (this.signupEmail.match(/^(\w|[_.])+\@[a-z]+\.[a-z]+/)) {
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
    if (this.signupPass1.length > 0 &&
      this.signupPass2.length > 0) {

      if (this.signupPass1 == this.signupPass2) {
        return true
      } else {
        this.dialogError.showErrorDialog(5)
      }
    } else {
      this.dialogError.showErrorDialog(4)
    }

    return false
  }
  //endregion PRIVATE_METHODS
}
