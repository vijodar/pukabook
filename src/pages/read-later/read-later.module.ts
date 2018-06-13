import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadLaterPage } from './read-later';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReadLaterPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadLaterPage),
    ComponentsModule
  ],
})
export class ReadLaterPageModule { }
