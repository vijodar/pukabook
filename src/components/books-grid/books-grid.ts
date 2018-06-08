import { Author } from './../../model/author';
import { App } from 'ionic-angular';
import { UserDBProvider } from './../../providers/userdb/userdb';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { RestClientProvider } from './../../providers/rest-client/restClient';
import { Book } from './../../model/book';
import { Component, Input } from '@angular/core';
import { BookDetailsPage } from '../../pages/book-details/book-details';

@Component({
  selector: 'books-grid',
  templateUrl: 'books-grid.html'
})
export class BooksGridComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  books: Book[]
  //endregion INPUTS

  //region PRIVATE_VARIABLES
  private bookid: number
  //endregion PRIVATE_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    var result = data.result
    console.log(result);
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      var book: Book = result.book
      var author: Author = result.author
      this.appCtrl.getRootNavs()[0].push(BookDetailsPage, {
        'book': book,
        'author': author
      })

    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "book/" + this.bookid,
            "Basic " + basic, this)
        })
    }
  }

  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region CONST
  constructor(
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private appCtrl: App) { }
  //endregion CONST

  //region PRIVATE_METHODS
  private getBookDetails() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "book/" + this.bookid, "Bearer " + value.token, this)
      })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public viewBookDetails(id: number) {
    this.bookid = id
    this.getBookDetails()
  }
  //endregion PUBLIC_METHODS

}
