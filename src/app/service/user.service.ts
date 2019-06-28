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
    return this.http.get(globals.server+'api/userinfo/'+userId);
  }
  updateUserInfo(userInfo: UserInfo){
    return this.http.put(globals.server+'api/userinfo/'+userInfo.userId,userInfo);
  }
  changePassword(userId:string,passOld:string,passNew:string){
    let data = {passOld:passOld,passNew:passNew}
    return this.http.put(globals.server+'api/users/changepassword/'+userId,data);
  }
  getUser(page:number,keyword:string,role:string){
    return this.http.get(globals.server+'api/users?page='+page+'&keyword='+keyword+'&role='+role);
  }
  updateRole(id:string,role:string){
    return this.http.get(globals.server+'api/users/change-role/'+id+'/'+role);
  }
}
