import { HttpClient } from "@angular/common/http";

export class UploadService {
    constructor(private http: HttpClient) { }

    updateUserFile(formData: FormData) {
      return this.http.post('/users/update', formData);
  }
 }
