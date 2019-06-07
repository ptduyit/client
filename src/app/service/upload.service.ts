import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  upload(formData: FormData){
    return this.http.post('https://localhost:44354/api/upload', formData);
  }

}
