import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }
  getCart(userId: string){
    return this.http.get('https://localhost:44354/api/cart/'+userId);
  }
  deleteItem(userId: string, productId: number)
  {
    return this.http.delete('https://localhost:44354/api/cart/'+userId+'/'+productId);
  }
  addItem(cartDetail: CartDetail)
  {
    return this.http.post('https://localhost:44354/api/cart',cartDetail);
  }
  updateQuantity(userId: string, productId: number, quantity: number)
  {
    var body = [{op:'replace',path:'/quantity',value:quantity}]
    return this.http.patch('https://localhost:44354/api/cart/'+userId+'/'+productId,body);
  }
  getTotalQuantity(userId: string){
    return this.http.get('https://localhost:44354/api/cart/'+userId+'/quantity');
  }
  checkOut(cart: Cart[], addressId: number){
    return this.http.post('https://localhost:44354/api/orders/'+addressId, cart);
  }
}
