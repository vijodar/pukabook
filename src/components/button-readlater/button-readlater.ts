import { OnHttpResponse } from './../../interfaces/onHttpResponse';
import { Component } from '@angular/core';

@Component({
  selector: 'button-readlater',
  templateUrl: 'button-readlater.html'
})
export class ButtonReadlaterComponent implements OnHttpResponse {

  //region PUBLIC_VARIABLES
  public isReadLater: boolean
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    throw new Error("Method not implemented.");
  }
  onErrorReceivingData(message: number) {
    throw new Error("Method not implemented.");
  }
  //endregion ONHTTPRESPONSE

  //region CONSTRUCTOR
  constructor() {
    this.isReadLater = false
  }
  //endregion CONSTRUCTOR

  test1() {
    this.isReadLater = true
  }

  test2() {
    this.isReadLater = false
  }
}
