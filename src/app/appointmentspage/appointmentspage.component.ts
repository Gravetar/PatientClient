import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from '../Models/Appointment';

@Component({
  selector: 'app-appointmentspage',
  templateUrl: './appointmentspage.component.html',
  styleUrls: ['./appointmentspage.component.css']
})


export class AppointmentspageComponent implements OnInit {

  appointments: Appointment[] = [];
  isExist: boolean = false;
  displayedColumns: string[] = ['Дата записи', 'Врач', 'Время записи', 'Кабинет'];
  dataSource = new MatTableDataSource<Appointment>(this.appointments);

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  //Получение зписей к врачу текущего пользователя
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

  //Удаление записи к врачу
  RemoveAppointment(id: undefined | string) {
    return this.http.delete("http://localhost:35702/api/Home/RemoveAppointments/" + id).subscribe
    (response => {
      console.log(response);
    }, err => {
      console.log(err);
    })
    }

}
