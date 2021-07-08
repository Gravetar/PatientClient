import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../Models/Patient';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  CurrentPatient: Patient = new Patient()

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
        this.CurrentPatient = response;
      }, err => {
        console.log(err);
      })
      
  }

  
}
