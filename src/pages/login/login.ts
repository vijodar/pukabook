import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { OnHttpResponse } from '../../interfaces/onHttpResponse'
import { RestClientProvider } from '../../providers/rest-client/restClient'
import { SigninComponent } from './../../components/signin/signin';
import { SignupComponent } from '../../components/signup/signup';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //region CONSTANTS
  private translateStrings = {
    "LOGIN_SWITCH_SIGNIN": "LOGIN_SWITCH_SIGNIN",
    "LOGIN_SWITCH_SIGNUP": "LOGIN_SWITCH_SIGNUP"
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public pwdType: string = "password"
  public pwdIcon: string = "md-eye-off"

  public signinStatus: string
  public signupStatus: string
  //endregion PUBLIC_VARIABLES

  //region PRIVATE_VARIABLES
  private btnSwitchSignInString: string
  private btnSwitchSignUpString: string
  //endregion PRIVATE_VARIABLES

  //region CONST
  constructor(public navCtrl: NavController,
    public rjs: RestClientProvider,
    private translate: TranslateService) {

    this.starter()
  }
  //endegion CONST

  //region PRIVATE_METHODS
  private starter() {
    this.signinStatus = "signinShow"
    this.signupStatus = "signupHide"

    this.translate.get(this.translateStrings.LOGIN_SWITCH_SIGNIN)
      .subscribe(value => {
        this.btnSwitchSignInString = value
      })
    this.translate.get(this.translateStrings.LOGIN_SWITCH_SIGNUP)
      .subscribe(value => {
        this.btnSwitchSignUpString = value
      })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  switchForm() {
    var btnSwitchForm = document.getElementById("btnSwitchForm")
    btnSwitchForm.classList.add("btnSwitchFadeOI")
    btnSwitchForm.textContent = btnSwitchForm.textContent == this.btnSwitchSignUpString ? this.btnSwitchSignInString : this.btnSwitchSignUpString

    this.signinStatus = this.signinStatus == "signinHide" ? "signinShow" : "signinHide"
    this.signupStatus = this.signupStatus == "signupHide" ? "signupShow" : "signupHide"

    setTimeout(() => {
      btnSwitchForm.classList.remove("btnSwitchFadeOI")
    }, 800);
  }

  //endregion PUBLIC_METHODS
}
