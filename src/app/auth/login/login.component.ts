import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataShareService } from 'src/app/service/datashare.service'
import { NotificationsService } from 'angular2-notifications';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/model/cart';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { AuthService as  AuthExtendService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router
    ,private dataService: DataShareService, private socialAuthService: AuthExtendService,
    private _service: NotificationsService, private cartService: CartService, private title: Title) {
      this.title.setTitle('Đăng nhập');
     }


  ngOnInit() {
  }
  onSubmit(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe((data: response) => {
        if(!data.isError){
          localStorage.setItem('token', data.module.token);
          localStorage.setItem('userId', data.module.id);
          localStorage.setItem('name',data.module.fullName);
          this.cartService.getTotalQuantity(data.module.id).subscribe((rs : response) =>{
            if(!rs.isError){
              this.dataService.updateNumberProduct(rs.module);
            }
            else
              console.log(rs.message);
          });
          this.dataService.updateStatus(data.module.fullName);

          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

          this._service.success(
            'Đăng nhập thành công','Vui lòng chờ',
            {
              position: ["bottom", "right"],
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
          );
          this.router.navigateByUrl(redirect);
        }
        else{
          console.log(data.message);
        }
      },
        err => {
          this._service.error(
            'Đăng nhập thất bại','Vui lòng thử lại',
            {
              position: ["bottom", "right"],
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
        );
          this.isLoginError = true;
        });
  }
  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    var token;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        if(socialPlatform == "facebook"){
          token = userData.authToken;
        }
        else if(socialPlatform == "google"){
          token = userData.idToken;
        }
        this._service.info('Chờ máy chủ xác thực','',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          });
        this.authService.externalLogin(token,socialPlatform)
        .subscribe((data: response) =>  {
          this._service.success('Đăng nhập thành công','',
            {
              position: ["bottom", "right"],
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
          );
          this.dataService.updateStatus(data.module.fullName);
          localStorage.setItem('token', data.module.token);
          localStorage.setItem('userId', data.module.id);
          localStorage.setItem('name',data.module.fullName);
          this.cartService.getTotalQuantity(data.module.id).subscribe((rs : response) =>{
            if(!rs.isError){
              this.dataService.updateNumberProduct(rs.module);
            }
            else
              console.log(rs.message);
          });
          this.router.navigate(['/']);
        },
        err=>{
          this._service.error('Đăng nhập thất bại','Vui lòng thử lại',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          });
        });
      }
    );
  }
}
