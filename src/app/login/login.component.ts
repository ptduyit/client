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
import { NotificationsService } from 'angular2-notifications';
import { CartService } from '../shared/cart.service';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isUserLoggedIn: boolean;
  productNumber: number;
  constructor(private userService: UserService, private router: Router
    ,private dataService: DataShareService, private socialAuthService: AuthService,
    private _service: NotificationsService, private cartService: CartService) { }


  ngOnInit() {
  }
  onSubmit(username, password) {
    this.userService.login(username, password)
      .subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          this.dataService.updateStatus(data);
          localStorage.setItem('userId', data.id);
          
          this._service.success(
            'Đăng nhập thành công',
            'Vui lòng chờ',
            {
              position: ["bottom", "right"],
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
          );
          this.router.navigate(['/home']);
        
      },
        err => {
          this._service.error(
            'Đăng nhập thất bại',
            'Vui lòng thử lại',
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
        this.userService.externalLogin(token,socialPlatform)
        .subscribe((data: any) =>  {
          this._service.success(
            'Đăng nhập thành công',
            '',
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
