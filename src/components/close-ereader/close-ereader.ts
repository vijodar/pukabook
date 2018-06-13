import { ErrorDialogProvider } from './../../providers/error-dialog/error-dialog';
import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component, Input } from '@angular/core';
import { OnCloseEreaderResponse } from '../../interfaces/onCloseEreaderResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { UserDBProvider } from '../../providers/userdb/userdb';

@Component({
  selector: 'close-ereader',
  templateUrl: 'close-ereader.html'
})
export class CloseEreaderComponent implements OnHttpResponse {

  //region INPUTS
  @Input()
  onCloseEreader: OnCloseEreaderResponse

  @Input()
  idBook: number

  @Input()
  alines: number
  //endregion INPUTS

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      if (result.update) {
        this.onCloseEreader.onClickCloseReader()
      } else {
        this.onErrorReceivingData(6)
      }
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "updatelines/ " + this.idBook,
            "Basic " + basic, this)
        })
    }
  }

  onErrorReceivingData(message: number) {
    this.errordialog.showErrorDialog(message)
  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor(
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private errordialog: ErrorDialogProvider) {

    console.log(this.alines, this.idBook);

  }
  //endregion CONSTRUCTOR

  //region PUBLIC_METHODS
  public closeEreader() {
    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "updatelines/ " + this.idBook + "/" + this.alines,
          "Bearer " + value.token, this)
      })
  }
  //endregion PUBLIC_METHODS
}
