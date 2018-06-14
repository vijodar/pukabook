import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable()
export class HasherProvider {

  //region PRIVATE_VARIABLES
  private key: string = "MYeo8OZvaQR2vqn4"
  //endregion PRIVATE_VARIABLES

  //region CONSTRUCTOR
  constructor() {
  }
  //endregion CONSTRUCTOR

  //region PUBLIC_METHODS
  public encrypt(string: string) {
    return CryptoJS.AES.encrypt(string, this.key).toString()
  }

  public decrypt(string: string) {
    var bytes = CryptoJS.AES.decrypt(string, this.key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
  //endregion PUBLIC_METHODS
}
