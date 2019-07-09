import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  redirectUrl: string;
  
  login(userName: string, password: string) {
    var data = {username: userName, password: password };
    //var reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(globals.server+'api/Login', data);
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
  signup(fullname: string, email: string, password: string, phonenumber: string){
    var data = {fullName: fullname, email: email, password: password, phoneNumber: phonenumber};
    //var reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(globals.server+'api/Users', data);
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
  externalLogin(accessToken:string, platform: string) {
    //var reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    let body = JSON.stringify({ accessToken });  
    return this.http
      .post(globals.server+'api/ExternalLogin/'+platform, body);
      // .pipe(
      //   catchError(this.handleError)
      // );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
