//region IONIC
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//endregion IONIC

//region ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//endregion ANGULAR

//region NGX_TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//region NGX_TRANSLATE

import { MyApp } from './app.component';

//region PAGES
import { LoginPage } from '../pages/login/login';
//endregion PAGES

//region PROVIDERS
import { RestClientProvider } from '../providers/rest-client/restClient';
//endregion PROVIDERS

//region COMPONENTS
import { SigninComponent } from '../components/signin/signin';
import { SignupComponent } from '../components/signup/signup';
//endregion COMPONENTS

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestClientProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}