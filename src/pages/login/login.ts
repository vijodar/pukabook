import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { OnHttpResponse } from '../../interfaces/onHttpResponse'
import { RestClientProvider } from '../../providers/rest-client/restClient'
import { SigninComponent } from './../../components/signin/signin';
import { SignupComponent } from '../../components/signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnHttpResponse {

  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"

  public signinStatus: String
  public signupStatus: String
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public navCtrl: NavController, public rjs: RestClientProvider) {
    this.starter()
  }
  //endegion CONST

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    console.log(data)
  }
  onErrorReceivingData(message: any) {
    throw new Error("Method not implemented.")
  }
  //endregion ONHTTPRESPONSE
  
  //region PUBLIC_METHODS
  private starter(){
    this.signinStatus = "signinShow"
    this.signupStatus = "signupHide"
  }

  switchForm() {
    this.signinStatus = this.signinStatus == "signinHide" ? "signinShow" : "signinHide"
    this.signupStatus = this.signupStatus == "signupHide" ? "signupShow" : "signupHide"
  }

  //endregion PUBLIC_METHODS
}
