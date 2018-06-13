import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from './../pages/login/login';
import { UserDBProvider } from '../providers/userdb/userdb';
import { RestClientProvider } from '../providers/rest-client/restClient';
import { OnHttpResponse } from '../interfaces/onHttpResponse';
import { StartPage } from '../pages/start/start';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnHttpResponse {

    //region ROOT_PAGE
    rootPage: any;
    //endregion ROOT_PAGE

    //region ONHTTPRESPONSE
    onDataReceived(data: any) {
        var result = data.result
        if (result.auth) {
            this.userdb.modifyUserToken(result.t)
            this.splashScreen.hide()
            this.rootPage = StartPage
        } else {
            this.splashScreen.hide()
        }
    }

    onErrorReceivingData(message: number) {

    }
    //endregion ONHTTPRESPONSE

    //region CONSTRUCTOR
    constructor(
        platform: Platform,
        private splashScreen: SplashScreen,
        private translate: TranslateService,
        private userdb: UserDBProvider,
        private rjs: RestClientProvider) {

        this.initTranslate();
        platform.ready().then(() => {
            this.checkIfIsLogged()
        });
    }
    //endregion CONSTRUCTOR

    //region PRIVATE_METHODS
    private checkIfIsLogged() {
        this.userdb.getUser()
            .then(value => {
                if (value) {
                    var basic = btoa(value.email + ":" + value.pass)
                    this.rjs.doRequest("POST", "login",
                        "Basic " + basic, this)
                } else {
                    this.rootPage = LoginPage
                }
            })
    }
    //endregion PRIVATE_METHODS

    //region PUBLIC_METHODS
    initTranslate() {
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en');
        }
    }
    //endregion PUBLIC_METHODS
}

