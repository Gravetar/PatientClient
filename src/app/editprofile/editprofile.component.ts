import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../Models/Patient';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EditprofileComponent implements OnInit {

  EditedPatient: Patient = new Patient();
  urlimg?: string;
  uploadimg?: FormData;
  invalidEdit!: boolean;

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
        this.EditedPatient = response;
        //Получение изображения пользователя
        this.urlimg="http://localhost:35702/AccountImages/"+this.EditedPatient.id+".png?"+Date.now()
      }, err => {
        console.log(err);
      })
  }

  Edit(form: NgForm) {
    const credentials = {
      'id': this.EditedPatient.id?.toString(),
      'email': form.value.email,
      'name': form.value.name,
      'surname': form.value.surname,
      'patronymic': form.value.patronymic,
      'numberpolicy': form.value.numberpolicy,
      'numberpassport': form.value.numberpassport,
      'phone': form.value.phone,
      'dateofbirth': form.value.dateofbirth
    }
    try {
      credentials.dateofbirth = credentials.dateofbirth.format("yyyy-MM-DD");
    }
    catch {}

    this.http.post("http://localhost:35702/api/Home/EditPatient", credentials)
    .subscribe(response => {
      const token = (<any>response).token;
      this.invalidEdit = false;
      console.log(credentials);
    }, err => {
      this.invalidEdit = true;
      console.log(credentials)
      console.log(err);
    })

    if (this.uploadimg != null)
    {
        this.http.post("http://localhost:35702/api/home/UploadImage", this.uploadimg)
        .subscribe(response => {
          const token = (<any>response).token;
          console.log(this.uploadimg);
        }, err => {
          console.log(err)
        })
    }

    setTimeout(function(){
    }, 5000)
    const Auth = {
      'email': this.EditedPatient.email,
      'password': this.EditedPatient.password
    }
    console.log(Auth);
        //Вход в аккаунт
        this.http.post("http://localhost:35702/api/home/auth", Auth)
        .subscribe(response => {
          const token = (<any>response).token;
          console.log(token);
          localStorage.setItem("jwt", token);
          this.router.navigate(["profile"]);
        }, err => {
          console.log(err)
        })
  }

parseDate(dateString: string | undefined): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return new Date("");
    }
}

upload(files: any) {
  if (files.length === 0)
    return;

  const formData = new FormData();

  for (let file of files)
    formData.append(file.name, file);
    console.log(formData);

    this.uploadimg = formData;
}
}
