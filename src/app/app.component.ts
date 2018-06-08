import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from './../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoginPage;

    constructor(private translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            splashScreen.hide();
        });
        this.initTranslate();
    }

    initTranslate() {
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en');
        }
    }
}

