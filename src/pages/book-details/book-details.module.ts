import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailsPage } from './book-details';
import { ExpandableComponent } from './../../components/expandable/expandable';
import { BooksimilarsComponent } from '../../components/booksimilars/booksimilars';

@NgModule({
  declarations: [
    BookDetailsPage,
    ExpandableComponent,
    BooksimilarsComponent
  ],
  imports: [
    IonicPageModule.forChild(BookDetailsPage),
  ],
})
export class BookDetailsPageModule { }
