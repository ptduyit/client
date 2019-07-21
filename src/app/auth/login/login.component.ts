import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/service/datashare.service';
import { CartService } from 'src/app/service/cart.service';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { AuthService as AuthExtendService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  queryParamSubscription: Subscription;
  redirect = null;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute
    , private dataService: DataShareService, private socialAuthService: AuthExtendService,
    private toastr: ToastrService, private cartService: CartService, private title: Title) {
    this.title.setTitle('Đăng nhập');
  }


  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.redirect = params.get('redirect');
    });
  }
  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }
  signup() {
    let url = this.router.url;
    if (this.redirect) {
      this.router.navigate(['signup'], { queryParams: { 'redirect': this.redirect } });
    } else {
      if (url === '/' || url === '/login' || url === '/signup') {
        this.router.navigate(['signup']);
      }
      else {
        this.router.navigate(['signup'], { queryParams: { 'redirect': url } });
      }
    }
  }
  onSubmit(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe((data: response) => {
        if (!data.isError) {
          var token = jwt_decode(data.module.token);
          var user = JSON.stringify({
            id: data.module.id,
            name: data.module.fullName,
            role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          });
          localStorage.setItem('user', user);
          localStorage.setItem('token', data.module.token);
          this.cartService.getTotalQuantity(data.module.id).subscribe((rs: response) => {
            if (!rs.isError) {
              this.dataService.updateNumberProduct(rs.module);
            }
            else
              console.log(rs.message);
          });
          this.dataService.updateStatus(data.module.fullName);
          this.toastr.success('', 'Đăng nhập thành công');
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = null;
          }
          else {
            this.router.navigateByUrl(this.redirect);
          }
        }
        else {
          this.toastr.error('', 'Tài khoản hoặc mật khẩu không tồn tại');
        }
      },
        err => {

        });
  }
  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    var token;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (socialPlatform == "facebook") {
          token = userData.authToken;
        }
        else if (socialPlatform == "google") {
          token = userData.idToken;
        }
        this.toastr.info("", "Đang xác thực...")
        this.authService.externalLogin(token, socialPlatform)
          .subscribe((data: response) => {
            if (!data.isError) {
              var token = jwt_decode(data.module.token);
              var user = JSON.stringify({
                id: data.module.id,
                name: data.module.fullName,
                role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
              });
              localStorage.setItem('user', user);
              localStorage.setItem('token', data.module.token);
              this.dataService.updateStatus(data.module.fullName);
              this.toastr.success("", "Đăng nhập thành công");
              this.cartService.getTotalQuantity(data.module.id).subscribe((rs: response) => {
                if (!rs.isError) {
                  this.dataService.updateNumberProduct(rs.module);
                }
                else
                  console.log(rs.message);
              });
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = null;
              }
              else {
                this.router.navigateByUrl(this.redirect);
              }
            }
            else{
              console.log(data.message)
            }
          },
            err => {
              if (err.status === 0) {
                this.toastr.error("", "không thể kết nối máy chủ");
              }
              else {
                this.toastr.error("", "Lỗi không xác định");
              }
            });
      }
    );
  }
}
