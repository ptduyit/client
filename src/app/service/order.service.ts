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
  getOrders(){
    return this.http.get<Order[]>(globals.server+'api/Orders/GetAllOrders');
  }
  getOrderByIdUser(id: string){
    return this.http.get<Order[]>(globals.server+'api/Orders/GetOrderByIdUser/' + id);
  }

  createOrder(cart: Cart, addressId: number){
    return this.http.post(globals.server+'api/orders/'+addressId, cart);
  }
  updateStatusOrder(id: number, status: number){
    return this.http.get(globals.server+'api/Orders/PutConfirmOrders/'+id+'/'+status);
  }
  getOrdersByStatus(status: number){
    return this.http.get<Order[]>(globals.server+'api/Orders/GetConfirmOrders/'+status)
  }
}

