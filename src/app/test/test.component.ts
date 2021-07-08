import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../Models/Patient';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  records!: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  //Получение текущего пользователя
  this.http.get("http://localhost:35702/api/home/GetUser").subscribe
  (response => {
    console.log(response);
    anythis.records = response;
  }, err => {
    console.log(err);
  })
  }
}
