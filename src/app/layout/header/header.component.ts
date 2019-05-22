import { Component, OnInit, } from '@angular/core';
import { DataShareService } from '../../service/datashare.service'
import { Router } from '@angular/router';
import { UserInfo } from '../../model/user-info';
import { UserService } from '../../service/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: any;
  productNumber: number = 0;
  userInfo: UserInfo;

  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private dataShareService: DataShareService,
    private userService: UserService, private _service: NotificationsService, private cartService: CartService) {
    
  }

  ngOnInit() {
    this.dataShareService.cast.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.dataShareService.num.subscribe(value => this.productNumber = value);
    this.check();
  }
   
  check(){
    if(this.userId != null){
      this.userService.getUserInfo(this.userId).subscribe(data => this.userInfo = data);
      this.cartService.getCart(this.userId).subscribe((data : Cart[]) =>{
        this.productNumber = data.reduce( function( runningValue: number, cart: Cart){
          return runningValue + cart.quantity;
        },0);
      });
    }
  }
  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.dataShareService.updateStatus('');
    this.dataShareService.updateNumberProduct(0);
    this.token = '';
    this.userId = '';
    this._service.info('Đã đăng xuất','',
        {
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
  }



}
