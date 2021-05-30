import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MyApisService } from './services/my-apis.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {path:''        , redirectTo:'sign-up' , pathMatch:'full'},
      {path:'sign-up' , component:SignupComponent},
      {path:'welcome' , component:WelcomeComponent , canActivate:[AuthGuardService]}
    ]),
  ],
  providers: [MyApisService , AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
