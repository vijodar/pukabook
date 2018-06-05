import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { Component } from '@angular/core';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent implements OnHttpResponse {

  //region PUBLIC_VARIABLES
  public signupEmail: string
  public signupPass1: string
  public signupPass2: string
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public rjs: RestClientProvider,
    public dialogError: ErrorDialogProvider) {

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
    }else{
      this.dialogError.showErrorDialog(4)
    }

    return false
  }
  //endregion PRIVATE_METHODS
}
