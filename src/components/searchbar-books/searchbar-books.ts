import { OnGetBooksResponse } from './../../interfaces/onSearchBooksResponse';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { Book } from '../../model/book';
import { ErrorDialogProvider } from '../../providers/error-dialog/error-dialog';

@Component({
  selector: 'searchbar-books',
  templateUrl: 'searchbar-books.html'
})
export class SearchbarBooksComponent implements OnHttpResponse {

  //region VIEW_CHILD
  @ViewChild('selectFilter') selectRef: Select;
  //endregion VIEW_CHILD

  //region INPUTS
  @Input()
  showFilterBtn: boolean

  @Input()
  url: string

  @Input()
  onSearchBooks: OnGetBooksResponse
  //endregion INPUTS

  //region CONSTANTS
  private translateStrings = {
    "SEARCHBAR_PLACEHOLDER": "SEARCHBAR_PLACEHOLDER",
    "SEARCHBAR_FILTER_NAME": "SEARCHBAR_FILTER_NAME",
    "SEARCHBAR_FILTER_GENRE": "SEARCHBAR_FILTER_GENRE",
    "SEARCHBAR_FILTER_AUTHOR": "SEARCHBAR_FILTER_AUTHOR",
    "SEARCHBAR_FILTER_COLLECTION": "SEARCHBAR_FILTER_COLLECTION",
    "SEARCHBAR_FILTER_TITLE": "SEARCHBAR_FILTER_TITLE",
    "SEARCHBAR_FILTER_CANCEL": "SEARCHBAR_FILTER_CANCEL",
    "SEARCHBAR_FILTER_OK": "SEARCHBAR_FILTER_OK",
  }
  //endregion CONSTANTS

  //region PRIVATE_VARIABLES
  private words: string
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public filter: string

  public searchPlaceholder: string
  public filterName: string
  public filterGenre: string
  public filterAuthor: string
  public filterCollection: string
  public filterTitle: string
  public filterCancel: string
  public filterOk: string
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      if (result.books) {
        this.onSearchBooks.onGetBooks(result.books)
      } else {
        this.onErrorReceivingData(7)
      }
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "searchbooks/" + this.url + "/" + this.filter,
            "Basic " + basic, this, { words: this.words })
        })
    }
  }

  onErrorReceivingData(message: number) {
    this.dialogError.showErrorDialog(message)
  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private userdb: UserDBProvider,
    private rjs: RestClientProvider,
    public dialogError: ErrorDialogProvider, ) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.filter = "name"

    this.setTranslateStrings()
  }

  private setTranslateStrings() {
    this.translate.get(this.translateStrings.SEARCHBAR_PLACEHOLDER)
      .subscribe(value => { this.searchPlaceholder = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_NAME)
      .subscribe(value => { this.filterName = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_GENRE)
      .subscribe(value => { this.filterGenre = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_AUTHOR)
      .subscribe(value => { this.filterAuthor = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_COLLECTION)
      .subscribe(value => { this.filterCollection = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_TITLE)
      .subscribe(value => { this.filterTitle = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_CANCEL)
      .subscribe(value => { this.filterCancel = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_OK)
      .subscribe(value => { this.filterOk = value })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public openFilterSelect() {
    this.selectRef.open();
  }

  public search(words: string) {
    this.words = words
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "searchbooks/" + this.url + "/" + this.filter,
          "Bearer " + value.token, this, { words: words })
      })
  }
  //endregion PUBLIC_METHODS
}
