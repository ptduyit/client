import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootUrl = 'https://localhost:44354/api/Orders';
  readonly orderDetailUrl = 'https://localhost:44354/api/OrderDetails/ExitsOrderDetails';
  constructor(private http: HttpClient) { }
  getOrders(){
    return this.http.get<Order[]>(this.rootUrl+'/GetAllOrders');
  }
  getOrderByIdUser(id: string){
    return this.http.get<Order[]>(this.rootUrl + '/GetOrderByIdUser/' + id);
  }
  deleteOrder(id : number){
    return this.http.delete<Order[]>(this.rootUrl +'/DeleteOrders/'+ id);
  }
  createOrder(Order: Order){
    return this.http.post(this.rootUrl+'/PostOrders', Order);
  }
  updateOrder(Order: Order){
    return this.http.put(this.rootUrl+'/PutOrders/'+Order.orderId,Order);
  }
  getCartId(id: string){
    return this.http.get(this.rootUrl+'/GetCartId/'+id);
  }
  existOrderDetail(orderId: number, productId: number){
    return this.http.get(this.orderDetailUrl+'/'+orderId+'/'+productId,{observe: 'response'});
  }
}

