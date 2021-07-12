import { HttpClient, HttpClientModule, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../Models/Patient';
import { DownloadService } from '../services/Downloadservice';
import { UploadService } from '../services/UploadSevice';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  positions: any;
  doctors: any;

  position?: string;

  doctor?: string;
  date?:string;
  timeforadd?: string;

  freetime: string[] = [];
  having: boolean = false;




   ngOnInit(): void {
    this.getAllPositions();
  }
  constructor(private http: HttpClient) { }

  getAllPositions (){
      //Получение текущего пользователя
      this.http.get("http://localhost:35702/api/home/GetPositions").subscribe
      (response => {
        console.log(response);
        this.positions = response;
      }, err => {
        console.log(err);
      })
  }

  getAllDoctors (){
    //Получение текущего пользователя
    this.http.get("http://localhost:35702/api/home/GetDoctorsByPosition/" + this.position).subscribe
    (response => {
      console.log(response);
      this.doctors = response;
    }, err => {
      console.log(err);
    })
}

onChangePosition(newValue: any) {
  console.log(newValue);
  this.position = newValue;
  this.getAllDoctors();
  }

  onChangeDoctor(newValue: any) {
    this.doctor = newValue;


    console.log(this.position);
    console.log(this.doctor);
    }

    onChangeDate(newValue: any) {
      this.date = newValue;

    //Получение
    this.http.get<string[]>("http://localhost:35702/api/home/GetFreeTimeDoctor/" + this.doctor + "/" + this.date).subscribe
    (response => {
      console.log(response);
      this.freetime = response;
      this.having = true;
    }, err => {
      console.log(err);
    })

      console.log(this.position);
      console.log(this.doctor);
      console.log(this.date);
      console.log(this.freetime);
      }

      onChangeTime(newValue: any) {
          this.timeforadd = newValue;
        }

      AddAppointment(form: NgForm) {
        const credentials = {
          'date': this.date,
          'time': this.timeforadd,
          'doctorid': this.doctor,
        }
        console.log(credentials);

        this.http.post("http://localhost:35702/api/Home/NewAppointment", credentials)
        .subscribe(response => {
          console.log(credentials);
          console.log(response);
        }, err => {
          console.log(credentials)
          console.log(err);
        })
      }
}
