import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  //region CONSTANTS
  private translateStrings = {
    "HOME_TITLE": "HOME_TITLE",
    "EXPLORE_TITLE": "EXPLORE_TITLE"
  }
  //endregion CONSTANTS

  //region PUBLIC_METHODS
  public homeRoot = 'HomePage'
  public exploreRoot = 'ExplorePage'
  
  public homeTitle: string
  public exploreTitle: string

  public color: string
  //endregion PUBLIC_METHODS

  //region CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private statusBar: StatusBar,
    private translate: TranslateService) {
    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.statusBar.overlaysWebView(false)
    this.statusBar.backgroundColorByHexString("#554257")

    this.translate.get(this.translateStrings.HOME_TITLE)
      .subscribe(value => { this.homeTitle = value })

    this.translate.get(this.translateStrings.EXPLORE_TITLE)
      .subscribe(value => { this.exploreTitle = value })
  }
  //endregion PRIVATE_METHODS

}
