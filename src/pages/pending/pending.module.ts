import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingPage } from './pending';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PendingPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingPage),
    ComponentsModule
  ],
})
export class PendingPageModule {}
