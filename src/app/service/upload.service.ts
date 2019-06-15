import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  upload(formData: FormData){
    return this.http.post(globals.server+'api/upload', formData);
  }

}
