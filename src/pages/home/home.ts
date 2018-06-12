import { Book } from './../../model/book';
import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { RestClientProvider } from './../../providers/rest-client/restClient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "HOME_TITLE": "HOME_TITLE",
    "HOME_NO_PENDINGS_MSG": "HOME_NO_PENDINGS_MSG",
    "HOME_NO_PENDINGS_BTN": "HOME_NO_PENDINGS_BTN",
    "HOME_PENDINGS_CONTINUE_READINGS": "HOME_PENDINGS_CONTINUE_READINGS",
    "HOME_PENDINGS_SIMILAR": "HOME_PENDINGS_SIMILAR",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public title: string
  public noPendingsMsg: string
  public noPendingsBtn: string
  public pendingsContinueBtn: string
  public pendingsSimilar: string

  public noPending: boolean

  public lastBook: Book
  public books: Book[]
  public alines: number
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      if (result.lastbook && result.books) {
        this.noPending = false
        this.alines = result.lastbook.alines
        delete result.lastbook.alines
        this.lastBook = <Book>result.lastbook
        console.log(this.lastBook);
        this.books = result.books
      } else {
        this.noPending = true
      }
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

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private rjs: RestClientProvider,
    private userdb: UserDBProvider
  ) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.noPending = true
    this.lastBook = new Book()

    this.translate.get(this.translateStrings.HOME_TITLE)
      .subscribe(value => { this.title = value })

    this.translate.get(this.translateStrings.HOME_NO_PENDINGS_BTN)
      .subscribe(value => { this.noPendingsBtn = value })

    this.translate.get(this.translateStrings.HOME_NO_PENDINGS_MSG)
      .subscribe(value => { this.noPendingsMsg = value })

    this.translate.get(this.translateStrings.HOME_PENDINGS_CONTINUE_READINGS)
      .subscribe(value => { this.pendingsContinueBtn = value })

    this.translate.get(this.translateStrings.HOME_PENDINGS_SIMILAR)
      .subscribe(value => { this.pendingsSimilar = value })

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/home", "Bearer " + value.token, this)
      })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public goToExplore() {
    this.navCtrl.parent.select(1);
  }
  //endregion PUBLIC_METHODS

}
