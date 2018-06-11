import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, Input } from '@angular/core';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'button-readlater',
  templateUrl: 'button-readlater.html'
})
export class ButtonReadlaterComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  idBook: number
  //endregion INPUTS

  //region CONSTANTS
  private translateStrings = {
    "OK_BTN": "ERROR_OK",
    "READLATER_ADDED": "READLATER_ADDED",
    "READLATER_REMOVED": "READLATER_REMOVED",
  }
  //endregion CONSTANTS

  //region PUBLIC_VARIABLES
  public isReadLater: boolean

  public okBtn: string
  public addMsg: string
  public removeMsg: string
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      if (result.isReadLater) {
        this.isReadLater = result.isReadLater
      } else if (result.addReadLater) {
        this.isReadLater = true
        this.addedBookmark()
      } else if (result.removeReadLater) {
        this.isReadLater = false
        this.removedBookmark()
      }
    } else {
      if (!this.isReadLater) {
        this.userdb.getUser()
          .then(value => {
            var basic = btoa(value.email + ":" + value.pass)
            this.rjs.doRequest("POST", "readlater/add",
              "Basic " + basic, this, { idbook: this.idBook })
          })
      } else {
        this.userdb.getUser()
          .then(value => {
            var basic = btoa(value.email + ":" + value.pass)
            this.rjs.doRequest("POST", "readlater/remove",
              "Basic " + basic, this, { idbook: this.idBook })
          })
      }
    }
  }

  onErrorReceivingData(message: number) {
  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private translate: TranslateService,
    private toastCtrl: ToastController) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.isReadLater = false

    this.translate.get(this.translateStrings.OK_BTN)
      .subscribe(value => { this.okBtn = value })

    this.translate.get(this.translateStrings.READLATER_ADDED)
      .subscribe(value => { this.addMsg = value })

    this.translate.get(this.translateStrings.READLATER_REMOVED)
      .subscribe(value => { this.removeMsg = value })

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "readlater/check",
          "Bearer " + value.token, this, { idbook: this.idBook })
      })
  }

  private addedBookmark() {
    let toast = this.toastCtrl.create({
      message: this.addMsg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: this.okBtn
    })

    toast.present()
  }

  private removedBookmark() {
    let toast = this.toastCtrl.create({
      message: this.removeMsg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: this.okBtn
    })

    toast.present()
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public addReadLater() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "readlater/add",
          "Bearer " + value.token, this, { idbook: this.idBook })
      })
  }

  public removeReadLater() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "readlater/remove",
          "Bearer " + value.token, this, { idbook: this.idBook })
      })
  }
  //endregion PUBLIC_METHODS
  test1() { //When bookmark
    this.isReadLater = true
  }

  test2() { //When dis bookmark
    this.isReadLater = false
  }
}
