import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OrderDetail } from '../model/order-detail';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  constructor(private http: HttpClient) { }
  getOrderDetail(){
    return this.http.get<OrderDetail[]>(globals.server+'api/OrderDetails/GetAllOrders');
  }
  getOrderDetailById(id: number){
    return this.http.get<OrderDetail>(globals.server+'api/OrderDetails/GetOrderById/' + id);
  }
  deleteOrderDetail(orderId : number, productId: number){
    return this.http.delete<OrderDetail[]>(globals.server+'api/OrderDetails/DeleteOrders/'+ orderId+'/'+productId);
  }
  createOrderDetail(OrderDetail: OrderDetail){
    return this.http.post(globals.server+'api/OrderDetails/PostOrders', OrderDetail);
  }
  updateOrderDetail(OrderDetail: OrderDetail){
    return this.http.put(globals.server+'api/OrderDetails/PutOrders/'+OrderDetail.orderId,OrderDetail);
  }
}
