import { Author } from './../../model/author';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage {

  //region PUBLIC_VARIABLES
  public author: Author
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.starter()
  }
  //endregion CONST

  //region PRIVATE_METHODS
  private starter() {
    this.author = this.navParams.get('author')
  }
  //endregion PRIVATE_METHODS
}
