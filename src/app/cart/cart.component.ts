import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
import { Order } from '../model/order';
import { Router } from '@angular/router';

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

  constructor(private cartService : CartService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getCart();
    
  }
  getCart(){
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
     this.cartService.checkOut(this.order).subscribe(data => {
        this.router.navigate(['home']);
      });
  }
}
