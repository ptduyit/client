import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';
import { Cart } from '../model/cart';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getOrders(status:number,page:number,id:number,size:number,sort:string){
    return this.http.get(globals.server+'api/admin/orders?status='+status+'&page='+page+'&id='+id+'&size='+size+'&sort='+sort);
  }
  getOrderByIdUser(id: string,page:number,status:number){
    return this.http.get(globals.server+'api/user/orders/'+id+'/?page='+page+'&status='+status);
  }

  createOrder(cart: Cart, addressId: number){
    return this.http.post(globals.server+'api/orders/'+addressId, cart);
  }
  updateStatusOrder(id: number, status: number){
    return this.http.get(globals.server+'api/orders/update/'+id+'/'+status);
  }
  checkHistoryBuy(id:string){
    return this.http.get(globals.server+'api/admin/orders/check-history/'+id);
  }
  cancelOrderUser(userId: string, orderId: number){
    return this.http.get(globals.server+'api/orders/cancel/'+userId+'/'+orderId);
  }

}

