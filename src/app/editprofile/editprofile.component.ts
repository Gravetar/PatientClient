import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../Models/Patient';
import {BrowserModule} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  EditedPatient: Patient = new Patient();
  DatePatients: Date = new Date();

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const token: string|null = localStorage.getItem("jwt");
    if (!(token && !this.jwtHelper.isTokenExpired(token))) { //Если не авторизован
      this.router.navigate(["login"])} //Отправить на авторизацию

      //Получение текущего пользователя
      this.http.get("http://localhost:35702/api/home/GetUser").subscribe
      (response => {
        console.log(response);
        this.EditedPatient = response;
        this.DatePatients = this.parseDate(this.EditedPatient.dateofbirth);
      }, err => {
        console.log(err);
      })
      
  }
  invalidEdit!: boolean;

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

  
}
