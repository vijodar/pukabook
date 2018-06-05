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
    var ciphertext = CryptoJS.enc.Base64.parse(string)
    var iv = ciphertext.clone()
    iv.sigBytes = 16
    iv.clamp()
    ciphertext.words.splice(0, 4)
    ciphertext.sigBytes -= 16

    var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, this.key, {
        iv: iv
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  //endregion PUBLIC_METHODS
}
