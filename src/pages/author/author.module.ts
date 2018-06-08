import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorPage } from './author';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AuthorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorPage),
    ComponentsModule
  ],
})
export class AuthorPageModule {}
