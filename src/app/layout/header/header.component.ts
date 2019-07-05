import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DataShareService } from '../../service/datashare.service'
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../model/user-info';
import { UserService } from '../../service/user.service';
import { CartService } from '../../service/cart.service';
import { response } from 'src/app/model/response';
import { Subscription } from 'rxjs';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routerUrlSubscription: Subscription;
  loginSubscription: Subscription;
  numCartSubscription: Subscription;
  queryParamSubscription: Subscription;
  isUserLoggedIn : string;
  productNumber: number = 0;
  userInfo: UserInfo;
  currentUrl: string;
  token = localStorage.getItem('token');
  user = JSON.parse(localStorage.getItem('user'));
  redirect = null;
  constructor(private router: Router, private dataShareService: DataShareService, private route: ActivatedRoute,
    private userService: UserService, private toastr: ToastrService, private cartService: CartService) {
      
      this.routerUrlSubscription = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd ) {
          this.currentUrl = event.url;
        }
      });
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.redirect = params.get('redirect');
    });
    this.loginSubscription = this.dataShareService.cast.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.numCartSubscription = this.dataShareService.num.subscribe(value => {
      this.productNumber = value;
    });
    this.getQuantityCart();
  }
  ngOnDestroy(): void {
    this.numCartSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.routerUrlSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }
   
  getQuantityCart(){
    if(this.user != null){
      this.cartService.getTotalQuantity(this.user.id).subscribe((rs : response) =>{
        if(!rs.isError){
          this.productNumber = rs.module;
        }
        else
          console.log(rs.message);
      });
    }

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
  signup(){
    let url = this.router.url;
    if(this.redirect){
      this.router.navigate(['signup'], { queryParams: {'redirect': this.redirect}});
    }else{
      if(url === '/' || url === '/login' || url === '/signup'){
        this.router.navigate(['signup']);
      }
      else{
        this.router.navigate(['signup'], { queryParams: {'redirect': url}});
      }
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.dataShareService.updateStatus(null);
    this.dataShareService.updateNumberProduct(0);
    this.token = null;
    this.user = null;
    this.toastr.info("","Đã đăng xuất");
    this.router.navigateByUrl(this.currentUrl);
  }
}
