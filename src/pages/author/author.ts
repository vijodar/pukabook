import { Author } from './../../model/author';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { Book } from '../../model/book';
import { TranslateService } from '@ngx-translate/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "AUTHOR_DETAILS_KNOWN_FOR": "AUTHOR_DETAILS_KNOWN_FOR",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public author: Author
  public books: Book[]

  public knownForStr: string
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private translate: TranslateService,
    private photoViewer: PhotoViewer) {

    this.starter()
  }
  //endregion CONST

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
          this.rjs.doRequest("POST", "books/author",
            "Basic " + basic, this, { authorcode: this.author.id })
        })
    }
  }
  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region PRIVATE_METHODS
  private starter() {
    this.author = this.navParams.get('author')

    this.translate.get(this.translateStrings.AUTHOR_DETAILS_KNOWN_FOR)
      .subscribe(value => { this.knownForStr = value })

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "books/author", "Bearer " + value.token,
          this, { authorcode: this.author.id })
      })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public viewPhotoAuthor() {
    this.photoViewer.show('https://python-server-vicjod.c9users.io/images/authors?image=' + this.author.photo)
  }
  //endregion PUBLIC_METHODS
}
