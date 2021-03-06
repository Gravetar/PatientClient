import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';;
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { Doctor } from '../Models/Doctor';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.css']
})
export class AddappointmentComponent implements OnInit {

  positions: any;
  doctors: any;
  freetime: string[] = [];

  position?: string;
  doctor?: Doctor;
  date?:any;
  dateforshow?:any;
  timeforadd?: string | null;

  isPosition: boolean = false;
  isDoctor: boolean = false;
  isDate: boolean = false;
  isTime: boolean = false;

  isHavingTimes: boolean = false;

  minDate: Date;

  constructor(private http: HttpClient, public datepipe: DatePipe, private _adapter: DateAdapter<any>, private route: Router)
  {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.getAllPositions();
    this._adapter.setLocale("ru")
  }

  getAllPositions (){
    //Получение всех специальностей докторов
    this.http.get("http://localhost:35702/api/home/GetPositions").subscribe
    (response => {
      console.log(response);
      this.positions = response;
    }, err => {
      console.log(err);
    })
}

getAllDoctors (){
  //Получение всех докторов по специальности
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
    this.dateforshow = this.datepipe.transform(newValue, 'dd-MM-yyyy');

    this.date = this.datepipe.transform(newValue, 'yyyy-MM-dd');
    this.isTime = false;

  //Получение
  this.http.get<string[]>("http://localhost:35702/api/home/GetFreeTimeDoctor/" + this.doctor?.id + "/" + this.date).subscribe
    (response => {
      console.log(response);
      this.freetime = response;
      this.timeforadd = null;
      this.isDate = true;

      if (response.length>0) this.isHavingTimes = true; else this.isHavingTimes = false;

    }, err => {
      console.log(err);
    })
  }

onChangeTime(newValue: any) {
  this.timeforadd = newValue;

  this.isTime = true;
}

AddAppointment(form: NgForm) {
  const credentials = {
    'date': this.date,
    'time': this.timeforadd,
    'doctorid': this.doctor?.id
  }
  console.log(credentials);
  //Добавить новую запись к врачу
  this.http.post("http://localhost:35702/api/Home/NewAppointment", credentials)
  .subscribe(response => {
    console.log(credentials);
    console.log(response);
    this.route.navigate(['appointments'])
  }, err => {
    console.log(credentials)
    console.log(err);
  })
}
}
