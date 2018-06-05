import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorDialogProvider {

  //region VARIABLES
  private title: string
  private message: string
  private buttonText: string
  //endregion VARIABLES

  //region CONTRUCTOR
  constructor(public dialogCtrl: AlertController, public translate: TranslateService) {
    this.translate.get("ERROR_OK").subscribe(value => {
      this.buttonText = value
    })
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private setDialogConf(errorNo: number) {
    this.translate.get("ERROR").subscribe(value => {
      this.title = value + " -" + errorNo
    })

    this.translate.get("ERROR_MSG_" + errorNo).subscribe(value => {
      this.message = value
    })
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public showErrorDialog(errorNo: number) {
    this.setDialogConf(errorNo)
    
    let dialog = this.dialogCtrl.create({
      title: this.title,
      subTitle: this.message,
      buttons: [this.buttonText]
    });

    dialog.present();
  }
  //endregion PUBLIC_METHODS
}
