import { Book } from './../../model/book';
import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "EXPLORE_TITLE": "EXPLORE_TITLE"
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public books: Book[]
  //endregion PUBLIC_VARIABLES

  //region PUBLIC_METHODS
  public title: string
  //endregion PUBLIC_METHODS

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      this.books = result.books
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "books/explore",
            "Basic " + basic, this)
        })
    }
  }

  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private userdb: UserDBProvider,
    private rjs: RestClientProvider) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.translate.get(this.translateStrings.EXPLORE_TITLE)
      .subscribe(value => { this.title = value })

    this.getAllBooks()
  }

  private doRefresh(refresher: Refresher) {
    this.getAllBooks()
    refresher.complete();
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public getAllBooks() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/explore", "Bearer " + value.token, this)
      })
  }

  //endregion PUBLIC_METHODS

}
