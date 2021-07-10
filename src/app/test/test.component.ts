import { HttpClient, HttpClientModule, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
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

  CurrenUser: Patient = new Patient();
  CurrentUserId?: string;
  urlimg?: string;

   ngOnInit(): void {

  }
  constructor(private http: HttpClient) { }

  upload(files: any) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
      console.log(formData);

      this.http.post("http://localhost:35702/api/home/UploadImage", formData)
      .subscribe(response => {
        const token = (<any>response).token;
        console.log(formData);
      }, err => {
        console.log(err)
      })
  }
}
