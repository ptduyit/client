import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly rootUrl = 'https://localhost:44354/api/CartDetails';
  constructor(private http: HttpClient) { }
  getCart(userId: string){
    return this.http.get<Cart[]>(this.rootUrl+'/GetCartDetails/'+userId);
  }
  deleteCartDetail(userId: string, productId: number)
  {
    return this.http.delete<CartDetail[]>(this.rootUrl+'/DeleteCartDetails/'+userId+'/'+productId);
  }
  deleteCart(userId: string)
  {
    return this.http.delete<CartDetail[]>(this.rootUrl+'/DeleteCart/'+userId);
  }
  createCartDetail(cartDetail: CartDetail)
  {
    return this.http.post(this.rootUrl+'/PostCartDetails',cartDetail);
  }
  updateCartDetail(cartDetail: CartDetail)
  {
    return this.http.put(this.rootUrl+'/PutCartDetails/'+cartDetail.userId+'/'+cartDetail.productId,cartDetail);
  }
}
