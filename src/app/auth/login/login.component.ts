import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataShareService } from 'src/app/service/datashare.service'
import {
  AuthService as AuthExtendService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { NotificationsService } from 'angular2-notifications';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/model/cart';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isLoggedIn: boolean;
  productNumber: number;
  constructor(private authService: AuthService, private router: Router
    ,private dataService: DataShareService, private socialAuthService: AuthExtendService,
    private _service: NotificationsService, private cartService: CartService, private title: Title) {
      this.title.setTitle('Đăng nhập');
     }


  ngOnInit() {
  }
  onSubmit(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          this.dataService.updateStatus(data);

          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';

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
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    var token;
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
        this._service.info('Chờ máy chủ xác thực','',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          });
        this.authService.externalLogin(token,socialPlatform)
        .subscribe((data: any) =>  {
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
          this.dataService.updateStatus(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);

          this.cartService.getCart(data.id).subscribe((data : Cart[]) =>{
            this.productNumber = data.reduce( function( runningValue: number, cart: Cart){
              return runningValue + cart.quantity;
            },0);
            this.dataService.updateNumberProduct(this.productNumber);
          });
          this.router.navigate(['/home']);
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
