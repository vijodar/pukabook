import { Component } from '@angular/core';
import { IonicPage, NavController, Select } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import {UserProfilePage} from '../user-profile/user-profile';
import {PendingPage} from '../pending/pending';
import {ReadLaterPage} from '../read-later/read-later';
import {HelpPage} from '../help/help';


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

  //region PUBLIC_VARIABLES
  public homeRoot = 'HomePage'
  public exploreRoot = 'ExplorePage'
  
  public homeTitle: string
  public exploreTitle: string

  public color: string
  //endregion PUBLIC_VARIABLES

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
    this.statusBar.show()
    this.statusBar.overlaysWebView(false)
    this.statusBar.backgroundColorByHexString("#554257")

    this.translate.get(this.translateStrings.HOME_TITLE)
      .subscribe(value => { this.homeTitle = value })

    this.translate.get(this.translateStrings.EXPLORE_TITLE)
      .subscribe(value => { this.exploreTitle = value })
  }
  //endregion PRIVATE_METHODS


  //region PUBLIC_METHODS
  public openPage(page:string){
    if(page=='user-profile'){
      this.navCtrl.push(UserProfilePage);
    }else if(page=='pending'){
      this.navCtrl.push(PendingPage);
    }else if(page=='read-later'){
      this.navCtrl.push(ReadLaterPage);
    }else if(page=='help'){
      this.navCtrl.push(HelpPage);
    }else{

    }
  }

  public logout(){
    
  }
  //endregion PRIVATE_METHODS
  
}
