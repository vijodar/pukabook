import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ComponentsModule,
  ],
})
export class LoginPageModule { }
