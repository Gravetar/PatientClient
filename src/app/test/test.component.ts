import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../Models/Appointment';
import { Patient } from '../Models/Patient';
import { SocialInfoView } from '../Models/SocialInfoView';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  socialview!: SocialInfoView;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  //Получение текущего возраста
  this.http.get("http://localhost:35702/api/home/GetSocialInfo").subscribe
  (data => {
    console.log(data);
    this.socialview = data;
  }, err => {
    console.log(err);
  })
  }
}
