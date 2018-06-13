import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadLaterPage } from './read-later';

@NgModule({
  declarations: [
    ReadLaterPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadLaterPage),
  ],
})
export class ReadLaterPageModule {}
