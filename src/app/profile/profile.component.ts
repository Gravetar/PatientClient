import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../Models/Patient';

import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ProfileComponent implements OnInit {

  CurrentPatient: Patient = new Patient();
  CurrentUserId?: string;
  urlimg?: string;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private _adapter: DateAdapter<any>
  ) { }

  ngOnInit(): void {
    const token: string|null = localStorage.getItem("jwt");
    this._adapter.setLocale('ru');
    if (!(token && !this.jwtHelper.isTokenExpired(token))) { //Если не авторизован
      this.router.navigate(["login"])} //Отправить на авторизацию

      //Получение текущего пользователя
      this.http.get("http://localhost:35702/api/home/GetUser").subscribe
      (response => {
        console.log(response);
        this.CurrentPatient = response;
      }, err => {
        console.log(err);
      })

      //Получение текущего изображения пользователя
      this.http.get("http://localhost:35702/api/home/GetUser").subscribe
      (response => {
        console.log(response);
        this.CurrentPatient = response;
        this.CurrentUserId = this.CurrentPatient.id;
        this.urlimg="http://localhost:35702/AccountImages/"+this.CurrentUserId+".png?"+Date.now()
        console.log(this.urlimg);
      }, err => {
        console.log(err);
      })

  }


}
