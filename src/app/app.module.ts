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
//endregion PAGES

//region PROVIDERS
import { RestClientProvider } from '../providers/rest-client/restClient';
import { ErrorDialogProvider } from '../providers/error-dialog/error-dialog';
import { UserDBProvider } from '../providers/userdb/userdb';
import { HasherProvider } from '../providers/hasher/hasher';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { GooglePlus } from '@ionic-native/google-plus';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
//endregion PROVIDERS

//region PAGE_MODULES
import { LoginPageModule } from './../pages/login/login.module';
import { StartPageModule } from '../pages/start/start.module';
import { HomePageModule } from '../pages/home/home.module';
import { ExplorePageModule } from '../pages/explore/explore.module';
import { BookDetailsPageModule } from '../pages/book-details/book-details.module';
import { ComponentsModule } from '../components/components.module';
import { AuthorPageModule } from '../pages/author/author.module';
import { EreaderPageModule } from '../pages/ereader/ereader.module';
import { PendingPageModule } from '../pages/pending/pending.module';
import { ReadLaterPageModule } from '../pages/read-later/read-later.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { UsersettingsProvider } from '../providers/usersettings/usersettings';
//endregion PAGE_MODULES

//region FIREBASE_CONF
const firebaseConfig = {
  apiKey: "AIzaSyC-dp0BeYX3yHp1aXnjojLsuCfU2oE0UEg",
  authDomain: "pukabook-3f5ec.firebaseapp.com",
  databaseURL: "https://pukabook-3f5ec.firebaseio.com",
  projectId: "pukabook-3f5ec",
  storageBucket: "pukabook-3f5ec.appspot.com",
  messagingSenderId: "627097748993"
};
//endregion FIREBASE_CONF

@NgModule({
  declarations: [
    MyApp,
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
    LoginPageModule,
    StartPageModule,
    HomePageModule,
    ExplorePageModule,
    BookDetailsPageModule,
    AuthorPageModule,
    EreaderPageModule,
    PendingPageModule,
    ReadLaterPageModule,
    UserProfilePageModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    StartPage,
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
    ScreenOrientation,
    UsersettingsProvider
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}