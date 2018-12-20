import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OrderDetail } from '../model/order-detail';
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  readonly rootUrl = 'https://localhost:44354/api/OrderDetails';
  constructor(private http: HttpClient) { }
  getOrderDetail(){
    return this.http.get<OrderDetail[]>(this.rootUrl+'/GetAllOrders');
  }
  getOrderDetailById(id: number){
    return this.http.get<OrderDetail>(this.rootUrl + '/GetOrderById/' + id);
  }
  deleteOrderDetail(orderId : number, productId: number){
    return this.http.delete<OrderDetail[]>(this.rootUrl +'/DeleteOrders/'+ orderId+'/'+productId);
  }
  createOrderDetail(OrderDetail: OrderDetail){
    return this.http.post(this.rootUrl+'/PostOrders', OrderDetail);
  }
  updateOrderDetail(OrderDetail: OrderDetail){
    return this.http.put(this.rootUrl+'/PutOrders/'+OrderDetail.orderId,OrderDetail);
  }
}
