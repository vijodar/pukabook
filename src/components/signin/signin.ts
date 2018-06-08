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
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Platform, NavController, LoadingController } from 'ionic-angular';


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
  public userProfile: Observable<firebase.User>;
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(public rjs: RestClientProvider,
    public navCtrl: NavController,
    public storage: Storage,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public dialogError: ErrorDialogProvider,
    public userdb: UserDBProvider,
    public hasher: HasherProvider,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform) {

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

  public loginUser(): void {
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.gplus.login({
      'scopes': '', 
      'webClientId': '627097748993-59bn17d192rgm62n13q8ti48h2qh20lm.apps.googleusercontent.com', 
      'offline': true
    })
      .then(function (user) {
        loading.dismiss();

        console.log(user.displayName, user.email, user.imageUrl);
        
      }, function (error) {
        loading.dismiss();
      });
    // this.nativeGoogleLogin();
  }

  public singOut() {
    this.afAuth.auth.signOut();
    this.gplus.logout();
  }

  //endregion PUBLIC_METHODS

  //region PRIVATE_METHODS
  private starter() {
    this.userProfile = this.afAuth.authState;

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

  private async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '627097748993-59bn17d192rgm62n13q8ti48h2qh20lm.apps.googleusercontent.com',
        'offline': true,
        'scopes': ''
      })

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (err) {
      console.log(err)
    }
  }
  //endregion PRIVATE_METHODS
}
