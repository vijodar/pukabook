import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { Component } from '@angular/core';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "SIGN_UP_EMAIL_PLACEHOLDER": "SIGN_UP_EMAIL_PLACEHOLDER",
    "SIGN_UP_PASSWORD_PLACEHOLDER": "SIGN_UP_PASSWORD_PLACEHOLDER",
    "SIGN_UP_PASSWORD2_PLACEHOLDER": "SIGN_UP_PASSWORD2_PLACEHOLDER",
    "SIGN_UP_BUTTON": "SIGN_UP_BUTTON",
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

  //region CONST
  constructor(private rjs: RestClientProvider,
    private dialogError: ErrorDialogProvider,
    private translate: TranslateService, ) {

    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data)
  }
  onErrorReceivingData(message: number) {
    throw new Error("Method not implemented.")
  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  public signUpButton() {
    if (this.checkEmailField() && this.checkPassField()) {
      var userpass = btoa(this.signupEmail + ":" + this.signupPass1)
      var auth = "Basic " + userpass
      this.rjs.doRequest("POST", "login", auth + "", this)
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
