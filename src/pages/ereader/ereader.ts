import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-ereader',
  templateUrl: 'ereader.html',
})
export class EreaderPage implements OnHttpResponse {
  
  //region CONSTANTS
  //endregion CONSTANTS
  
  //region PUBLIC_VARIABLES
    onDataReceived(data: any) {
      throw new Error("Method not implemented.");
    }
    onErrorReceivingData(message: number) {
      throw new Error("Method not implemented.");
    }
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  //endregion ONHTTPRESPONSE

  //region CONTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private translate: TranslateService) {
  }
  //endregion CONTRUCTOR

  //region PRIVATE_METHODS
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  //endregion PUBLIC_METHODS
}
