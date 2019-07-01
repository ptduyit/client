import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/service/datashare.service';
import { CartService } from 'src/app/service/cart.service';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { AuthService as  AuthExtendService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';

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
    private toastr: ToastrService, private cartService: CartService, private title: Title) {
      this.title.setTitle('Đăng nhập');
     }


  ngOnInit() {
  }
  onSubmit(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe((data: response) => {
        if(!data.isError){
          var token = jwt_decode(data.module.token);
          var user = JSON.stringify({
            id: data.module.id,
            name: data.module.fullName,
            role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          });
          localStorage.setItem('user',user);
          localStorage.setItem('token', data.module.token);
          this.cartService.getTotalQuantity(data.module.id).subscribe((rs : response) =>{
            if(!rs.isError){
              this.dataService.updateNumberProduct(rs.module);
            }
            else
              console.log(rs.message);
          });
          this.dataService.updateStatus(data.module.fullName);

          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

          this.toastr.success('Đăng nhập thành công');
          this.router.navigateByUrl(redirect);
        }
        else{
          console.log(data.message);
        }
      },
        err => {
          
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
        this.toastr.info("Đang xác thực...")
        this.authService.externalLogin(token,socialPlatform)
        .subscribe((data: response) =>  {
          this.toastr.success("Đăng nhập thành công");
          this.dataService.updateStatus(data.module.fullName);
          var token = jwt_decode(data.module.token);
          var user = JSON.stringify({
            id: data.module.id,
            name: data.module.fullName,
            role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          });
          localStorage.setItem('user',user);
          localStorage.setItem('token', data.module.token);
          // localStorage.setItem('userId', data.module.id);
          // localStorage.setItem('name',data.module.fullName);
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
          if(err.status === 0){
            this.toastr.error("không thể kết nối máy chủ");
          }
          else{
            this.toastr.error("Lỗi không xác định");
          }
        });
      }
    );
  }
}
