import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OrderDetail } from '../model/order-detail';
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  constructor(private http: HttpClient) { }
  getOrderDetail(){
    return this.http.get<OrderDetail[]>('https://localhost:44354/api/OrderDetails/GetAllOrders');
  }
  getOrderDetailById(id: number){
    return this.http.get<OrderDetail>('https://localhost:44354/api/OrderDetails/GetOrderById/' + id);
  }
  deleteOrderDetail(orderId : number, productId: number){
    return this.http.delete<OrderDetail[]>('https://localhost:44354/api/OrderDetails/DeleteOrders/'+ orderId+'/'+productId);
  }
  createOrderDetail(OrderDetail: OrderDetail){
    return this.http.post('https://localhost:44354/api/OrderDetails/PostOrders', OrderDetail);
  }
  updateOrderDetail(OrderDetail: OrderDetail){
    return this.http.put('https://localhost:44354/api/OrderDetails/PutOrders/'+OrderDetail.orderId,OrderDetail);
  }
}
