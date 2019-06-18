import { Component, OnInit, } from '@angular/core';
import { DataShareService } from '../../service/datashare.service'
import { Router } from '@angular/router';
import { UserInfo } from '../../model/user-info';
import { UserService } from '../../service/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart.service';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn : string;
  productNumber: number = 0;
  userInfo: UserInfo;

  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  fullName = localStorage.getItem('name');
  constructor(private router: Router, private dataShareService: DataShareService,
    private userService: UserService, private _service: NotificationsService, private cartService: CartService) {
    
  }

  ngOnInit() {
    this.dataShareService.cast.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.dataShareService.num.subscribe(value => this.productNumber = value);
    this.getQuantityCart();
  }
   
  getQuantityCart(){
    if(this.userId != null){
      this.cartService.getTotalQuantity(this.userId).subscribe((rs : response) =>{
        if(!rs.isError){
          this.productNumber = rs.module;
        }
        else
          console.log(rs.message);
      });
    }
    // if(this.userId != null){
    //   this.userService.getUserInfo(this.userId).subscribe(data => this.userInfo = data);
    //   this.cartService.getCart(this.userId).subscribe((data : Cart[]) =>{
    //     this.productNumber = data.reduce( function( runningValue: number, cart: Cart){
    //       return runningValue + cart.quantity;
    //     },0);
    //   });
    // }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    this.dataShareService.updateStatus(null);
    this.dataShareService.updateNumberProduct(0);
    this.token = null;
    this.userId = null;
    this.fullName = null;
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
