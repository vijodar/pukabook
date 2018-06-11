import { OnGetBooksResponse } from '../../interfaces/onGetBooksResponse';
import { Book } from './../../model/book';
import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, Content, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage implements OnHttpResponse, OnGetBooksResponse {

  //region VIEW_CHILD
  @ViewChild(Content) content: Content;

  @ViewChild('selectFilter') selectRef: Select;
  //endregion VIEW_CHILD

  //region CONSTANTS
  private translateStrings = {
    "EXPLORE_TITLE": "EXPLORE_TITLE",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public books: Book[]
  public showSBar: boolean
  public filter: string
  public title: string
  public urlSearch: string
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

  //region ONSEARCHBOOKSRESPONSE
  onGetBooks(books: Book[]) {
    this.books = books
  }
  //ebdregion ONSEARCHBOOKSRESPONSE

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
    this.showSBar = false
    this.filter = "name"
    this.urlSearch = "explore"

    this.setTranslateStrings()
    this.getAllBooks()
  }

  private doRefresh(refresher: Refresher) {
    this.getAllBooks()
    refresher.complete();
  }

  private setTranslateStrings() {
    this.translate.get(this.translateStrings.EXPLORE_TITLE)
      .subscribe(value => { this.title = value })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public getAllBooks() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/explore", "Bearer " + value.token, this)
      })
  }

  public showHideSearchBar() {
    this.showSBar = !this.showSBar
    this.content.resize()
  }
  //endregion PUBLIC_METHODS

}
