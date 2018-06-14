import { HasherProvider } from './../../providers/hasher/hasher';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, Select } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserProfilePage } from '../user-profile/user-profile';
import { PendingPage } from '../pending/pending';
import { ReadLaterPage } from '../read-later/read-later';
import { LoginPage } from '../login/login';
import { UserDBProvider } from '../../providers/userdb/userdb';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  //region CONSTANTS
  private translateStrings = {
    "HOME_TITLE": "HOME_TITLE",
    "EXPLORE_TITLE": "EXPLORE_TITLE",
    "LOGOUT_TITLE": "LOGOUT_TITLE",
    "ERROR_OK": "ERROR_OK",
    "SEARCHBAR_FILTER_CANCEL": "SEARCHBAR_FILTER_CANCEL",
    "PENDING_TITLE": "PENDING_TITLE",
    "READLATER_TITLE": "READLATER_TITLE",
    "WELCOME_MSG": "WELCOME_MSG",
    "USERPROFILE_TITLE": "USERPROFILE_TITLE",
  }
  //endregion CONSTANTS

  //region PRIVATE_VARIABLES
  private logoutTitle: string
  private dialogOk: string
  private dialogCancel: string
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public homeRoot = 'HomePage'
  public exploreRoot = 'ExplorePage'

  public homeTitle: string
  public exploreTitle: string

  public pendingTitle: string
  public readLaterTitle: string
  public welcomeMsg: string
  public username: string
  public userProfileTitle: string

  public gUser: boolean
  //endregion PUBLIC_VARIABLES

  //region CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private userdb: UserDBProvider,
    private hasher: HasherProvider) {
    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.statusBar.show()
    this.statusBar.overlaysWebView(false)
    this.statusBar.backgroundColorByHexString("#554257")

    this.translate.get(this.translateStrings.HOME_TITLE)
      .subscribe(value => { this.homeTitle = value })

    this.translate.get(this.translateStrings.EXPLORE_TITLE)
      .subscribe(value => { this.exploreTitle = value })

    this.translate.get(this.translateStrings.LOGOUT_TITLE)
      .subscribe(value => { this.logoutTitle = value })

    this.translate.get(this.translateStrings.ERROR_OK)
      .subscribe(value => { this.dialogOk = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_CANCEL)
      .subscribe(value => { this.dialogCancel = value })

    this.translate.get(this.translateStrings.PENDING_TITLE)
      .subscribe(value => { this.pendingTitle = value })

    this.translate.get(this.translateStrings.READLATER_TITLE)
      .subscribe(value => { this.readLaterTitle = value })

    this.translate.get(this.translateStrings.WELCOME_MSG)
      .subscribe(value => { this.welcomeMsg = value })

    this.translate.get(this.translateStrings.USERPROFILE_TITLE)
      .subscribe(value => { this.userProfileTitle = value })

    this.userdb.getUser()
      .then(value => {
        this.gUser = value.guser == 1 ? true : false
        this.username = this.hasher.decrypt(value.user)
      })
  }
  //endregion PRIVATE_METHODS


  //region PUBLIC_METHODS
  public openPage(page: string) {
    switch (page) {
      case ('user-profile'):
        this.navCtrl.push(UserProfilePage);
        break;
      case ('pending'):
        this.navCtrl.push(PendingPage);
        break;
      case ('read-later'):
        this.navCtrl.push(ReadLaterPage);
        break;
    }
  }

  public logout() {
    let alert = this.alertCtrl.create({
      title: this.logoutTitle,
      buttons: [
        {
          text: this.dialogCancel,
          handler: () => { }
        },
        {
          text: this.dialogOk,
          handler: () => {
            this.userdb.removeUser()
            this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward' })
          }
        }
      ]
    });

    alert.present();
  }
  //endregion PRIVATE_METHODS

}
