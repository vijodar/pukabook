import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EreaderPage } from './ereader';

@NgModule({
  declarations: [
    EreaderPage,
  ],
  imports: [
    IonicPageModule.forChild(EreaderPage),
    ComponentsModule,
  ],
})
export class EreaderPageModule {}
