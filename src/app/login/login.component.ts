import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataShareService } from '../shared/datashare.service'

declare const FB: any;
declare const window: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isUserLoggedIn: boolean;
  constructor(private userService: UserService, private router: Router, private dataService: DataShareService) {
    this.dataService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }


  ngOnInit() {

    window.fbAsyncInit = function () {
      FB.init({
        appId: '1194855687339141',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
  onSubmit(username, password) {
    this.userService.login(username, password)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.dataService.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
      },
        err => {
          console.log('looix ' + err);
          this.isLoginError = true;
        });
  }
  submitLogin() {
    // FB.login();
    FB.login((response) => {
      
      if (response.status = "connected") {
        // FB.api('/me', { "fields": "birthday,email" }, function (response) {
        //   console.log(response);
        // });
        //login success
        //login success code here
        //redirect to home page
        this.userService.facebookLogin(response.authResponse.accessToken)
        .subscribe(data => {
          console.log(data);
        })
      }
      else {
        console.log('User login failed');
      }
    }, { scope: 'email,user_birthday' });

  }
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '349227848582-8qk4dfv1hsqvql2mg9nf21r1dhed26vh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.userService.googleLogin(googleUser.getAuthResponse().id_token).subscribe(data => {
          console.log(data);
        });
        //let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
