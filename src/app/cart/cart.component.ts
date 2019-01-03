import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { AddressService } from '../shared/address.service';
import { Address } from '../model/address';
import { NotificationsService } from 'angular2-notifications';
import { ProductService } from '../shared/product.service';
import { DataShareService } from '../shared/datashare.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId = localStorage.getItem('userId');
  carts: Cart[];
  total: number;
  order: Order ={} as any;
  addresses: Address[];
  addId: number;
  flag = false;
  stock: number;
  productNumber: number;
  constructor(private cartService : CartService, private router: Router, private addressService: AddressService,
    private _service: NotificationsService, private productService: ProductService, private dataService: DataShareService) { }

  ngOnInit() {
    if(this.userId){
      this.getCart();
      this.getAllAddress();
    } else{
      this.flag = true;
      this.router.navigate(['login']);
      this._service.info('Vui lòng đăng nhập','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
    }
    
    
  }
  addAddress(){
    this.router.navigate(['user/add-address/']);
  }
  getAllAddress(){
    this.addressService.getAllAddress(this.userId)
    .subscribe(data => {
      this.addresses = data;
      this.addresses.forEach((item,index) =>{
        if(item.isDefault === true){
          this.addId = item.addressId;
        }
      })
    })
  }
  getCart(){

      this.cartService.getCart(this.userId).subscribe((data : Cart[]) =>{
        this.carts = data;
        data.forEach(e => {
          this.productService.getStockProduct(e.productId).subscribe((data:any) => {
            if(data.stock < 1){
              this.carts = this.carts.filter(f => f.productId !== e.productId);
              this.cartService.deleteCartDetail(this.userId,e.productId).subscribe(data => {
                this._service.warn(
                  'Có sản phẩm đã bị xóa khỏi giỏ hàng','do hết hàng hoặc tạm ngưng bán',
                  {
                    position: ["bottom", "right"],
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: true,
                    maxLength: 10
                  });
                  
                  this.total = this.carts.reduce( function( runningValue: number, cart: Cart){
                    return runningValue + (cart.unitPrice * cart.quantity);
                  },0);
                  this.productNumber = this.carts.reduce( function( runningValue: number, cart: Cart){
                    
                    return runningValue + cart.quantity;
                  },0);
                  this.dataService.updateNumberProduct(this.productNumber);

              });
            }
          });
        });
        this.total = this.carts.reduce( function( runningValue: number, cart: Cart){
          return runningValue + (cart.unitPrice * cart.quantity);
        },0);
        this.productNumber = this.carts.reduce( function( runningValue: number, cart: Cart){
          
          return runningValue + cart.quantity;
        },0);
        this.dataService.updateNumberProduct(this.productNumber);
      },
      err =>{
        this.carts = null;
        this.flag = true;
      })
    
    
  }
  deleteCartDetail(productId: number){
    var ans = confirm("Bạn chắc chắn muốn bỏ sản phẩm này?");
    if(ans){
      this.cartService.deleteCartDetail(this.userId,productId)
      .subscribe( data => {
        this._service.warn(
          'Đã xóa','',
          {
            position: ["bottom", "right"],
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          }
        );
        this.getCart();
      });
    }
  }
  
  updateQuantity(cartDetail: CartDetail = {} as any, value: number){
    this.productService.getStockProduct(cartDetail.productId).subscribe((data: any) => {
     if(value > data.stock || value < 1){
      this._service.warn('Số lượng không đúng','Vui lòng thử lại',
        {
          position: ["bottom", "right"],
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
        this.getCart();
     } else {
        cartDetail.quantity = value;
        this.cartService.updateCartDetail(cartDetail).subscribe(data =>{
          this.getCart();
      })
     }
    });
    
  }
  checkOut(){
    if(!this.addId){
      this.router.navigate(['user/add-address']);
      this._service.success(
        'Vui lòng thêm địa chỉ đặt hàng','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
        
    }
    else{
     this.order.userId = this.userId;
     this.order.orderDetails = this.carts;
     this.cartService.checkOut(this.order,this.addId).subscribe(data => {
      this._service.success(
        'Đặt hàng thành công',
        'Chờ cửa hàng duyệt đơn',
        {
          position: ["bottom", "right"],
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        }
      );
       this.dataService.updateNumberProduct(0);
        this.router.navigate(['home']);
      },
      err =>{
        this._service.error('Đặt hàng thất bại',
          'Đã hết hàng hoặc sản phẩm ngưng bán',
          {
            position: ["bottom", "right"],
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          });
      });
    }
  }
}
