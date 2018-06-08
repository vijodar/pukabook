import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { RestClientProvider } from './../../providers/rest-client/restClient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "HOME_TITLE": "HOME_TITLE"
  }
  //endregion CONSTANTS

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    console.log(result);
    
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "books/home",
            "Basic " + basic, this)
        })
    }
  }
  onErrorReceivingData(message: number) {
    throw new Error("Method not implemented.");
  }
  //endregion ONHTTPRESPONSE

  //region PUBLIC_METHODS
  public title: string
  //endregion PUBLIC_METHODS


  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public rjs: RestClientProvider,
    public userdb: UserDBProvider
  ) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.translate.get(this.translateStrings.HOME_TITLE)
      .subscribe(value => { this.title = value })

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/home", "Bearer " + value.token, this)
      })
  }
  //endregion PRIVATE_METHODS

}
