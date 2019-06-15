import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserInfo } from '../model/user-info';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUserInfo(userId: string){
    return this.http.get<UserInfo>(globals.server+'api/UserInfoes/'+userId);
  }
  updateUserInfo(userInfo: UserInfo){
    return this.http.put(globals.server+'api/UserInfoes/'+userInfo.userId,userInfo);
  }
  
}
