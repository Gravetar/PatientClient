import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { TestComponent } from './test/test.component';
import { AapointmentspageComponent } from './aapointmentspage/aapointmentspage.component';
import { OutpatientcardComponent } from './outpatientcard/outpatientcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DemoMaterialModule } from './material-module';
import { DatePipe } from '@angular/common';
import { AddappointmentComponent } from './addappointment/addappointment.component';
import {MatIconModule} from '@angular/material/icon';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    ProfileComponent,
    EditprofileComponent,
    TestComponent,
    AapointmentspageComponent,
    OutpatientcardComponent,
    AddappointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:35702"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent, TestComponent],
  entryComponents: [TestComponent],
})
export class AppModule { }
