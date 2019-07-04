import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DataShareService } from '../../service/datashare.service'
import { Router, NavigationEnd, Event } from '@angular/router';
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
  isUserLoggedIn : string;
  productNumber: number = 0;
  userInfo: UserInfo;
  currentUrl: string;
  token = localStorage.getItem('token');
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router, private dataShareService: DataShareService,
    private userService: UserService, private toastr: ToastrService, private cartService: CartService) {
      
      this.routerUrlSubscription = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd ) {
          this.currentUrl = event.url;
        }
      });
  }

  ngOnInit() {
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
    this.router.navigate(['login']);
  }
  signup(){
    this.router.navigate(['signup']);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.dataShareService.updateStatus(null);
    this.dataShareService.updateNumberProduct(0);
    this.token = null;
    this.user = null;
    this.toastr.info("","Đã đăng xuất");
    this.router.navigate([this.router.url]);
  }



}
