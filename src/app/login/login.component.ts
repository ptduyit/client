import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataShareService } from '../shared/datashare.service'
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isUserLoggedIn: boolean;
  constructor(private userService: UserService, private router: Router, private dataService: DataShareService, private socialAuthService: AuthService) { }


  ngOnInit() {
  }
  onSubmit(username, password) {
    this.userService.login(username, password)
      .subscribe((data: any) => {
        localStorage.setItem('authToken', data.auth_token);
        this.dataService.updateStatus(data);
        this.router.navigate(['/home']);
      },
        err => {
          console.log('looix ' + err);
          this.isLoginError = true;
        });
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        if(socialPlatform == "facebook"){
          this.userService.facebookLogin(userData.token)
          .subscribe(data =>  {
            this.dataService.updateStatus(data);
            console.log(data);
          })
        }
        else if(socialPlatform == "google"){
          this.userService.googleLogin(userData.idToken)
          .subscribe(data =>  {
            this.dataService.updateStatus(data);
            console.log(data);
          })
        }
            
      }
    );
  }
}
