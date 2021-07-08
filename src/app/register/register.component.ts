import { HttpClientModule, HttpContext } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterComponent]
})

export class RegisterComponent {
  invalidRegister!: boolean;

  constructor(private route: Router, private http: HttpClient) {}

  Register(form: NgForm) {
    const credentials = {
      'email': form.value.email,
      'password': form.value.password,
      'name': form.value.name,
      'surname': form.value.surname,
      'patronymic': form.value.patronymic,
      'numberpolicy': form.value.numberpolicy,
      'numberpassport': form.value.numberpassport,
      'phone': form.value.phone,
      'dateofbirth': form.value.dateofbirth,
      'confirmPassword': form.value.confirmPassword,
    }
    this.http.post("http://localhost:35702/api/Home/Register", credentials)
    .subscribe(response => {
      const token = (<any>response).token;
      this.invalidRegister = false;
      this.route.navigate(["home"]);
    }, err => {
      this.invalidRegister = true;
      console.log(credentials)
      console.log(err);
    })
  }

}
