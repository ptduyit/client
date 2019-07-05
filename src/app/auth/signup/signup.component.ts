import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/service/datashare.service';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { ToastrService } from 'ngx-toastr';
import { AuthService as  AuthExtendService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CartService } from 'src/app/service/cart.service';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  queryParamSubscription: Subscription;
  redirect = null;
  constructor(private authService: AuthService, private router: Router, private dataService: DataShareService,
    private socialAuthService: AuthExtendService,private cartService: CartService,
    private toastr: ToastrService, private title: Title, private route: ActivatedRoute ) {
    this.title.setTitle('Đăng ký');
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.redirect = params.get('redirect');
    });
  }
  ngOnDestroy(){
    this.queryParamSubscription.unsubscribe();
  }
  login(){
    let url = this.router.url;
    if(this.redirect){
      this.router.navigate(['login'], { queryParams: {'redirect': this.redirect}});
    }else{
      if(url === '/' || url === '/signup' || url === '/login'){
        this.router.navigate(['login']);
      }
      else{
        this.router.navigate(['login'], { queryParams: {'redirect': url}});
      }
    }
  }
  onSubmit(signup: any) {
    this.authService.signup(signup.value.fullname, signup.value.email, signup.value.passGroup.password, signup.value.phonenumber)
      .subscribe((data: response) => {
        if (!data.isError) {
          this.dataService.updateStatus(data.module.fullName);
          var token = jwt_decode(data.module.token);
          var user = JSON.stringify({
            id: data.module.id,
            name: data.module.fullName,
            role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          });
          localStorage.setItem('user',user);
          localStorage.setItem('token', data.module.token);
          this.toastr.success("","Đăng ký thành công");
          if(this.authService.redirectUrl){
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = null;
          }
          else{
            this.router.navigateByUrl(this.redirect);
          }
        }else console.log(data.message);

      },
        err => {
          
        }
      )
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
        this.toastr.info("","Đang xác thực...")
        this.authService.externalLogin(token,socialPlatform)
        .subscribe((data: response) =>  {
          this.toastr.success("","Đăng nhập thành công");
          this.dataService.updateStatus(data.module.fullName);
          localStorage.setItem('token', data.module.token);
          var token = jwt_decode(data.module.token);
          var user = JSON.stringify({
            id: data.module.id,
            name: data.module.fullName,
            role: token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          });
          localStorage.setItem('user',user);
          this.cartService.getTotalQuantity(data.module.id).subscribe((rs : response) =>{
            if(!rs.isError){
              this.dataService.updateNumberProduct(rs.module);
            }
            else
              console.log(rs.message);
          });
          if(this.authService.redirectUrl){
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = null;
          }
          else{
            this.router.navigateByUrl(this.redirect);
          }
        },
        err=>{
          if(err.status === 0){
            this.toastr.error("","không thể kết nối máy chủ");
          }
          else{
            this.toastr.error("","Lỗi không xác định");
          }
        });
      }
    );
  }
}
