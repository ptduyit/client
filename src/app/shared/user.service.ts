import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'https://localhost:44354';
  constructor(private http: HttpClient) { }
  userAuthentication(userName, password) {
    var data = {username: userName, password: password };
    var reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(this.rootUrl + '/api/Login', data, reqHeader);
  }
}
