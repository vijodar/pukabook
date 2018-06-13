import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Refresher } from 'ionic-angular';
import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { RestClientProvider } from './../../providers/rest-client/restClient';
import { Book } from '../../model/book';
import { TranslateService } from '@ngx-translate/core';
import { OnGetBooksResponse } from '../../interfaces/onGetBooksResponse';

@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage implements OnHttpResponse, OnGetBooksResponse {

  //region VIEW_CHILD
  @ViewChild(Content) content: Content;
  //endregion VIEW_CHILD

  //region CONSTANTS
  private translateStrings = {
    "PENDING_TITLE": "PENDING_TITLE",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public books: Book[]

  public title: string
  public showSBar: boolean
  public urlSearch: string
  public filter: string
  //endregion PUBLIC_VARIABLES

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
          this.rjs.doRequest("POST", "books/readings",
            "Basic " + basic, this)
        })
    }
  }

  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region ONSEARCHBOOKSRESPONSEi
  onGetBooks(books: Book[]) {
    this.books = books
  }
  //ebdregion ONSEARCHBOOKSRESPONSE

  //region CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userdb: UserDBProvider,
    private rjs: RestClientProvider,
    private translate: TranslateService, ) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.showSBar = false
    this.filter = "name"
    this.urlSearch = "readings"

    this.translate.get(this.translateStrings.PENDING_TITLE)
      .subscribe(value => { this.title = value })

    this.getBooks()
  }

  private doRefresh(refresher: Refresher) {
    this.getBooks()
    refresher.complete();
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public getBooks() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/readings", "Bearer " + value.token, this)
      })
  }

  public showHideSearchBar() {
    this.showSBar = !this.showSBar
    this.content.resize()
  }
  //endregion PUBLIC_METHODS

}
