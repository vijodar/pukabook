import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailsPage } from './book-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BookDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailsPage),
    ComponentsModule,
  ],
})
export class BookDetailsPageModule { }
