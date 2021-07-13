import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';;
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../Models/Patient';
import { DownloadService } from '../services/Downloadservice';
import { UploadService } from '../services/UploadSevice';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.css']
})
export class AddappointmentComponent implements OnInit {

  selected!: Date | null;

  positions: any;
  doctors: any;

  position?: string;

  doctor?: string;
  date?:any;
  timeforadd?: string | null;

  freetime: string[] = [];
  isPosition: boolean = false;
  isDoctor: boolean = false;
  isDate: boolean = false;
  isTime: boolean = false;
  isHavingTimes: boolean = false;

  minDate: Date;

  constructor(private http: HttpClient, public datepipe: DatePipe, private _adapter: DateAdapter<any>)
  {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.getAllPositions();
    this._adapter.setLocale("ru")
  }

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
this.position = newValue;
this.isPosition = true;
this.isDoctor = false;
this.isTime = false;
this.isDate = false;
this.getAllDoctors();
}

onChangeDoctor(newValue: any) {
  this.doctor = newValue;
  this.isDoctor = true;
  this.isTime = false;
  this.isDate = false;
  }

  onChangeDate(newValue: any) {
    newValue = this.datepipe.transform(newValue, 'yyyy-MM-dd')
    console.log(this.timeforadd);
    this.date = newValue;
    this.isTime = false;

  //Получение
  this.http.get<string[]>("http://localhost:35702/api/home/GetFreeTimeDoctor/" + this.doctor + "/" + this.date).subscribe
  (response => {
    console.log(response);
    this.freetime = response;
    this.timeforadd = null;
    this.isDate = true;

    if (response.length>0) this.isHavingTimes = true; else this.isHavingTimes = false;

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
        this.isTime = true;
      }

    AddAppointment(form: NgForm) {
      const credentials = {
        'date': this.date,
        'time': this.timeforadd,
        'doctorid': this.doctor
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
