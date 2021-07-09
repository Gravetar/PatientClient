import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../Models/Appointment';

@Component({
  selector: 'app-aapointmentspage',
  templateUrl: './aapointmentspage.component.html',
  styleUrls: ['./aapointmentspage.component.css']
})
export class AapointmentspageComponent implements OnInit {

  appointments: Appointment[] = [];
  isExist: boolean = false;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  //Получение текущего пользователя
  this.http.get<Appointment[]>("http://localhost:35702/api/home/GetAppointments", ).subscribe
  ((data: Appointment[]) => {
    this.appointments = data;
    console.log(this.appointments);
    console.log(this.appointments.length);
    if (this.appointments.length!=0) this.isExist = true;
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