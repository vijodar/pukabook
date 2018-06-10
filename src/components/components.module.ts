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
import { BooksGridComponent } from './books-grid/books-grid';
import { ExpandableComponent } from './expandable/expandable';
import { SearchbarBooksComponent } from './searchbar-books/searchbar-books';
import { ButtonReadlaterComponent } from './button-readlater/button-readlater';
//endimports COMPONENTS

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent,
		BooksGridComponent,
		ExpandableComponent,
		SearchbarBooksComponent,
    ButtonReadlaterComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		SigninComponent,
		SignupComponent,
		BooksGridComponent,
		ExpandableComponent,
		SearchbarBooksComponent,
    ButtonReadlaterComponent,
	]
})
export class ComponentsModule { }