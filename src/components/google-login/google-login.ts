import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { HasherProvider } from './../../providers/hasher/hasher';
import { TranslateService } from '@ngx-translate/core';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, Input } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoadingController, NavController } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import sha1 from 'js-sha1';
import { User } from '../../model/user';
import { StartPage } from '../../pages/start/start';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  private navCtrl: NavController
  //endregion INPUTS

  //region CONSTANTS
  private translateStrings = {
    "SIGN_IN_GOOGLE": "SIGN_IN_GOOGLE",
    "LOADING": "LOADING"
  }
  //endregion CONSTANTS

  //region PRIVATE_VARIABLES
  private loadingMsg: string
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public title: string;
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    var result = data.result
    if (result.auth) {
      var user: User = <User>result.userinfo
      user.token = result.t
      this.userdb.addUser(user)
      this.statusBar.overlaysWebView(false)
      this.navCtrl.setRoot(StartPage, {}, { animate: true, direction: 'forward' })
    }
  }
  onErrorReceivingData() {

  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(
    private gplus: GooglePlus,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private rjs: RestClientProvider,
    private hasher: HasherProvider,
    private userdb: UserDBProvider,
    private errorDialog: ErrorDialogProvider,
    private statusBar: StatusBar) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_VARIABLES
  private starter() {
    this.translate.get(this.translateStrings.SIGN_IN_GOOGLE)
      .subscribe(value => { this.title = value })

    this.translate.get(this.translateStrings.LOADING)
      .subscribe(value => { this.loadingMsg = value })
  }
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public loginUser() {
    var userG: any
    let loading = this.loadingCtrl.create({
      content: this.loadingMsg
    });
    loading.present();
    this.gplus.login({
      'scopes': '',
      'webClientId': '627097748993-59bn17d192rgm62n13q8ti48h2qh20lm.apps.googleusercontent.com',
      'offline': true
    })
      .then(function (user) {
        loading.dismiss();
        userG = user
      }, function () {
        loading.dismiss()
      }).then(() => {
        if (userG) {
          var userpass = btoa(this.hasher.encrypt(userG.email) + ":" + sha1(userG.userId))
          var header = "Basic " + userpass
          var username = this.hasher.encrypt(userG.email.split("@")[0])

          this.rjs.doRequest("POST", "login/google", header, this, { username: username })
        } else {
          this.errorDialog.showErrorDialog(8)
        }
      })
  }
  //endregion PUBLIC_VARIABLES
}
