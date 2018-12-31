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
        console.log(data);
        localStorage.setItem('authToken', data.auth_token);
        this.dataService.updateStatus(data);
        localStorage.setItem('userId', data.id);
        this.router.navigate(['/home']);
      },
        err => {
          console.log('looix ' + err);
          this.isLoginError = true;
        });
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    let token;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        if(socialPlatform == "facebook"){
          token = userData.token;
        }
        else if(socialPlatform == "google"){
          token = userData.idToken;
        }

        this.userService.externalLogin(token,socialPlatform)
        .subscribe((data: any) =>  {
          console.log(data);
          this.dataService.updateStatus(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          this.router.navigate(['/home']);
        });
      }
    );
  }
}
