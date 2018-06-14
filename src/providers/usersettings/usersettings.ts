import { HasherProvider } from './../hasher/hasher';
import { ErrorDialogProvider } from './../error-dialog/error-dialog';
import sha1 from 'js-sha1';
import { UserDBProvider } from './../userdb/userdb';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Platform } from 'ionic-angular';
import { RestClientProvider } from '../rest-client/restClient';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';

@Injectable()
export class UsersettingsProvider implements OnHttpResponse {

  //region CONSTANTS
  private translateStrings = {
    "USERPROFILE_EMAIL_TITLE": "USERPROFILE_EMAIL_TITLE",
    "USERPROFILE_USER_TITLE": "USERPROFILE_USER_TITLE",
    "USERPROFILE_PASS_TITLE": "USERPROFILE_PASS_TITLE",
    "USERPROFILE_EMAIL_PLACEHOLDER": "USERPROFILE_EMAIL_PLACEHOLDER",
    "USERPROFILE_USER_PLACEHOLDER": "USERPROFILE_USER_PLACEHOLDER",
    "USERPROFILE_PASS_PLACEHOLDER": "USERPROFILE_PASS_PLACEHOLDER",
    "USERPROFILE_PASSOLD_PLACEHOLDER": "USERPROFILE_PASSOLD_PLACEHOLDER",
    "DIALOG_SEND": "DIALOG_SEND",
    "SEARCHBAR_FILTER_CANCEL": "SEARCHBAR_FILTER_CANCEL",
    "ERROR_OK": "ERROR_OK",
    "DIALOG_CLOSE_APP": "DIALOG_CLOSE_APP"
  }
  //endregion CONSTANTS

  //region PRIVATE_VAIRABLES
  private emailTitle: string
  private userTitle: string
  private passTitle: string
  private emailPlaceholder: string
  private userPlaceholder: string
  private passPlaceholder: string
  private passOldPlaceholder: string
  private dialogSendBtn: string
  private dialogCancelBtn: string
  private dialogOkBtn: string
  private dialogCloseAppTitle: string
  //endregion PRIVATE_VAIRABLES

  //region ONHTTPRESPONSE
  onDataReceived(data) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      if (result.update) {
        this.userdb.removeUser()
        this.showDialogCloseApp()
      }
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "updateuser",
            "Basic " + basic, this)
        })
    }
  }

  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private dialogError: ErrorDialogProvider,
    private hasher: HasherProvider,
    private platform: Platform) {

    this.starter()
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.translate.get(this.translateStrings.USERPROFILE_EMAIL_TITLE)
      .subscribe(value => { this.emailTitle = value })

    this.translate.get(this.translateStrings.USERPROFILE_USER_TITLE)
      .subscribe(value => { this.userTitle = value })

    this.translate.get(this.translateStrings.USERPROFILE_PASS_TITLE)
      .subscribe(value => { this.passTitle = value })

    this.translate.get(this.translateStrings.USERPROFILE_EMAIL_PLACEHOLDER)
      .subscribe(value => { this.emailPlaceholder = value })

    this.translate.get(this.translateStrings.USERPROFILE_USER_PLACEHOLDER)
      .subscribe(value => { this.userPlaceholder = value })

    this.translate.get(this.translateStrings.USERPROFILE_PASS_PLACEHOLDER)
      .subscribe(value => { this.passPlaceholder = value })

    this.translate.get(this.translateStrings.USERPROFILE_PASSOLD_PLACEHOLDER)
      .subscribe(value => { this.passOldPlaceholder = value })

    this.translate.get(this.translateStrings.DIALOG_SEND)
      .subscribe(value => { this.dialogSendBtn = value })

    this.translate.get(this.translateStrings.SEARCHBAR_FILTER_CANCEL)
      .subscribe(value => { this.dialogCancelBtn = value })

    this.translate.get(this.translateStrings.ERROR_OK)
      .subscribe(value => { this.dialogOkBtn = value })

    this.translate.get(this.translateStrings.DIALOG_CLOSE_APP)
      .subscribe(value => { this.dialogCloseAppTitle = value })
  }

  private checker(section: string, curPass: string, value1: string, value2: string) {

    this.userdb.getUser()
      .then(value => {
        if (sha1(curPass) == value.pass) {
          if (value1 == value2) {
            this.sendUpdate(section, value1)
          } else {
            this.dialogError.showErrorDialog(10)
          }
        } else {
          this.dialogError.showErrorDialog(9)
        }
      })
  }

  private sendUpdate(section: string, data: string) {
    var dataToSend: string
    switch (section) {
      case 'email':
        dataToSend = this.hasher.encrypt(data)
        break;
      case 'user':
        dataToSend = this.hasher.encrypt(data)
        break;
      case 'pass':
        dataToSend = sha1(data)
        break;
    }

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "updateuser", "Bearer " + value.token, this,
          { section: section, data: dataToSend })
      })
  }

  private showDialogCloseApp() {
    const confirm = this.alertCtrl.create({
      message: this.dialogCloseAppTitle,
      buttons: [
        {
          text: this.dialogOkBtn,
          handler: () => {
            this.platform.exitApp()
          }
        }
      ]
    });
    confirm.present()

    confirm.onDidDismiss(() => {
      this.platform.exitApp()
    })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_VARIABLES
  public editEmail() {
    const prompt = this.alertCtrl.create({
      title: this.emailTitle,
      inputs: [
        {
          name: 'passold',
          placeholder: this.passOldPlaceholder,
          type: 'password'
        },
        {
          name: 'email',
          placeholder: this.emailPlaceholder,
          type: 'email'
        },
        {
          name: 'email2',
          placeholder: this.emailPlaceholder,
          type: 'email'
        },
      ],
      buttons: [
        {
          text: this.dialogCancelBtn
        },
        {
          text: this.dialogSendBtn,
          handler: data => {
            this.checker('email', data.passold, data.email, data.email2)
          }
        }
      ]
    });
    prompt.present();
  }

  public editUser() {
    const prompt = this.alertCtrl.create({
      title: this.userTitle,
      inputs: [
        {
          name: 'passold',
          placeholder: this.passOldPlaceholder,
          type: 'password'
        },
        {
          name: 'user',
          placeholder: this.userPlaceholder
        },
        {
          name: 'user2',
          placeholder: this.userPlaceholder
        },
      ],
      buttons: [
        {
          text: this.dialogCancelBtn
        },
        {
          text: this.dialogSendBtn,
          handler: data => {
            this.checker('user', data.passold, data.user, data.user2)
          }
        }
      ]
    });
    prompt.present();
  }

  public editPass() {
    const prompt = this.alertCtrl.create({
      title: this.passTitle,
      inputs: [
        {
          name: 'passold',
          placeholder: this.passOldPlaceholder,
          type: 'password'
        },
        {
          name: 'pass',
          placeholder: this.passPlaceholder,
          type: 'password'
        },
        {
          name: 'pass2',
          placeholder: this.passPlaceholder,
          type: 'password'
        },
      ],
      buttons: [
        {
          text: this.dialogCancelBtn
        },
        {
          text: this.dialogSendBtn,
          handler: data => {
            this.checker('pass', data.passold, data.pass, data.pass2)
          }
        }
      ]
    });
    prompt.present();
  }
  //endregion PUBLIC_VARIABLES
}
