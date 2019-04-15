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
    return this.http.get<Cart[]>('/api/CartDetails/GetCartDetails/'+userId);
  }
  deleteCartDetail(userId: string, productId: number)
  {
    return this.http.delete<CartDetail>('/api/CartDetails/DeleteCartDetails/'+userId+'/'+productId);
  }
  deleteCart(userId: string)
  {
    return this.http.delete<CartDetail[]>('/api/CartDetails/DeleteCart/'+userId);
  }
  createCartDetail(cartDetail: CartDetail)
  {
    return this.http.post('/api/CartDetails/PostCartDetails',cartDetail);
  }
  updateCartDetail(cartDetail: CartDetail)
  {
    return this.http.put('/api/CartDetails/PutCartDetails/'+cartDetail.userId+'/'+cartDetail.productId,cartDetail);
  }
  checkOut(order: any, addressId: number){
    return this.http.post('/api/Orders/PostOrders/'+ addressId, order);
  }
}
