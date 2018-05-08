import { Component } from '@angular/core';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent implements OnHttpResponse {

  //region PUBLIC_VARIABLES
  public singupEmail: any
  public signupPass1: any
  public signupPass2: any
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public rjs: RestClientProvider) {
    this.starter()
  }
  //endregion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data)
  }
  onErrorReceivingData(message: any) {
    throw new Error("Method not implemented.")
  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  private starter() {
    this.singupEmail = ""
    this.signupPass1 = ""
    this.signupPass2 = ""
  }

  eventHandler(keyCode) {
    if (keyCode.keyCode == 13) {

    }
  }

  signUpButton() {
    var userpass = btoa("pepe" + ":" + "pepe")
    var auth = "Basic " + userpass
    console.log(auth);

    this.rjs.doRequest("GET", "login", auth + "", this)
  }
  //endregion PUBLIC_METHODS
}
