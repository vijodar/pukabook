import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorePage } from './explore';
import { BooksGridComponent } from '../../components/books-grid/books-grid';

@NgModule({
  declarations: [
    ExplorePage,
    BooksGridComponent
  ],
  imports: [
    IonicPageModule.forChild(ExplorePage),
  ],
})
export class ExplorePageModule {}