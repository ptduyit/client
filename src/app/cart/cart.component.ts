import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { AddressService } from '../shared/address.service';
import { Address } from '../model/address';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId = '';
  carts: Cart[];
  total: number;
  order: Order ={} as any;
  addresses: Address[];
  addId: number;
  constructor(private cartService : CartService, private router: Router, private addressService: AddressService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getCart();
    this.getAllAddress();
    
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
    this.carts = null;
    this.cartService.getCart(this.userId).subscribe((data : Cart[]) =>{
      this.carts = data;
      this.total = data.reduce( function( runningValue: number, cart: Cart){
        return runningValue + (cart.unitPrice * cart.quantity);
      },0);
    })
  }
  deleteCartDetail(productId: number){
    var ans = confirm("Bạn chắc chắn muốn bỏ sản phẩm này?");
    if(ans){
      this.cartService.deleteCartDetail(this.userId,productId)
      .subscribe( data => {
        this.getCart();
      });
    }
  }
  updateQuantity(cartDetail: CartDetail = {} as any, value: number){
    cartDetail.quantity = value;
    this.cartService.updateCartDetail(cartDetail).subscribe(data =>{
      this.getCart();
    })
  }
  checkOut(){
     this.order.userId = this.userId;
     this.order.orderDetails = this.carts;
     this.cartService.checkOut(this.order,this.addId).subscribe(data => {
        this.router.navigate(['home']);
      });
  }
}
