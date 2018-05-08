//imports IONIC
import { IonicModule } from 'ionic-angular';
//endimports IONIC

//imports ANGULAR
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//endimports ANGULAR

//imports NGX_TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//endimports NGX_TRANSLATE

//imports COMPONENTS
import { SigninComponent } from './signin/signin';
import { SignupComponent } from './signup/signup';
//endimports COMPONENTS

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent,
	],
	imports: [
		IonicModule,
		TranslateModule.forRoot({
			loader: {
			  provide: TranslateLoader,
			  useFactory: (HttpLoaderFactory),
			  deps: [HttpClient]
			}
		  }),
	],
	exports: [
		SigninComponent,
		SignupComponent,
	]
})
export class ComponentsModule { }

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }