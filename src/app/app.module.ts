import { MyApp } from './app.component';

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
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
//endregion ANGULAR

//region NGX_TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//region NGX_TRANSLATE

//region SQLite
import { SQLite } from '@ionic-native/sqlite';
//endregion SQLite

//region PAGES
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import {PendingPage} from '../pages//pending/pending';
import {ReadLaterPage} from '../pages//read-later/read-later';
import {HelpPage} from '../pages//help/help';
//endregion PAGES

//region PROVIDERS
import { RestClientProvider } from '../providers/rest-client/restClient';
import { ErrorDialogProvider } from '../providers/error-dialog/error-dialog';
import { UserDBProvider } from '../providers/userdb/userdb';
import { HasherProvider } from '../providers/hasher/hasher';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import { GooglePlus } from '@ionic-native/google-plus';
//endregion PROVIDERS

//region PAGE_MODULES
import { HomePageModule } from '../pages/home/home.module';
import { ExplorePageModule } from '../pages/explore/explore.module';
import { BookDetailsPageModule } from '../pages/book-details/book-details.module';
import { ComponentsModule } from '../components/components.module';
import { AuthorPageModule } from '../pages/author/author.module';
import { DirectivesModule } from './../directives/directives.module';
//endregion PAGE_MODULES

const firebaseConfig = {
  apiKey: "AIzaSyC-dp0BeYX3yHp1aXnjojLsuCfU2oE0UEg",
  authDomain: "pukabook-3f5ec.firebaseapp.com",
  databaseURL: "https://pukabook-3f5ec.firebaseio.com",
  projectId: "pukabook-3f5ec",
  storageBucket: "pukabook-3f5ec.appspot.com",
  messagingSenderId: "627097748993"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    StartPage,
    UserProfilePage,
    PendingPage,
    ReadLaterPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HomePageModule,
    ExplorePageModule,
    BookDetailsPageModule,
    AuthorPageModule,
    ComponentsModule,
    DirectivesModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    StartPage,
    UserProfilePage,
    PendingPage,
    ReadLaterPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestClientProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ErrorDialogProvider,
    UserDBProvider,
    HasherProvider,
    PhotoViewer,
    SQLite,
    GooglePlus,
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}