import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class DownloadService {
    constructor(private http: HttpClient) { }

    getPhoto() {
      return this.http.get<ImageData>("http://localhost:35702/api/home/GetImage").subscribe
      (response => {
          console.log(response);
          return response;
      }, err => {
        console.log(err);
      })
  }

 }
