import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../Models/Appointment';
import { Patient } from '../Models/Patient';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  appointments: Appointment[] = [];

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  //Получение текущего пользователя
  this.http.get<Appointment[]>("http://localhost:35702/api/home/GetAppointments", ).subscribe
  ((data: Appointment[]) => {
    this.appointments = data;
    console.log(this.appointments);
  }, err => {
    console.log(err);
  })
  }
  
  RemoveAppointment(id: string) {
    return this.http.delete("http://localhost:35702/api/Home/RemoveAppointments/" + id).subscribe
    (response => {
      console.log(response);
    }, err => {
      console.log(err);
    })
    }
}
