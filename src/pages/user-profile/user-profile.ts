import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersettingsProvider } from '../../providers/usersettings/usersettings';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  //region CONSTANTS
  private translateStrings = {
    "USERPROFILE_TITLE": "USERPROFILE_TITLE",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public title: string
  //endregion PUBLIC_VARIABLES

  //region CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userSettings: UsersettingsProvider,
    private translate: TranslateService) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.translate.get(this.translateStrings.USERPROFILE_TITLE)
    .subscribe(value => { this.title = value })
  }
  //endregion PRIVATE_METHODS
}
