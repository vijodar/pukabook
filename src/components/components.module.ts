//imports IONIC
import { IonicModule } from 'ionic-angular';
//endimports IONIC

//imports ANGULAR
import { NgModule } from '@angular/core';
//endimports ANGULAR

//imports COMPONENTS
import { SigninComponent } from './signin/signin';
import { SignupComponent } from './signup/signup';
import { BooksGridComponent } from './books-grid/books-grid';
import { ExpandableComponent } from './expandable/expandable';
import { SearchbarBooksComponent } from './searchbar-books/searchbar-books';
import { ButtonReadlaterComponent } from './button-readlater/button-readlater';
import { GoogleLoginComponent } from './google-login/google-login';
//endimports COMPONENTS

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent,
		BooksGridComponent,
		ExpandableComponent,
		SearchbarBooksComponent,
    ButtonReadlaterComponent,
    GoogleLoginComponent,
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
    GoogleLoginComponent,
	]
})
export class ComponentsModule { }