import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Platform, NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  public userProfile: any = null;
  text: string;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private platform: Platform) 
  {
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
        this.userProfile = user;
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
}
