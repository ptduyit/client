import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootUrl = 'https://localhost:44354/api/Orders';

  constructor(private http: HttpClient) { }
  getOrders(){
    return this.http.get<Order[]>(this.rootUrl+'/GetAllOrders');
  }
  getOrderByIdUser(id: string){
    return this.http.get<Order[]>(this.rootUrl + '/GetOrderByIdUser/' + id);
  }

  createOrder(Order: Order){
    return this.http.post(this.rootUrl+'/PostOrders', Order);
  }
  updateStatusOrder(Order: Order, id: number, status: number){
    return this.http.put(this.rootUrl+'/PutConfirmOrders/'+id+'/'+status,Order);
  }
  getOrdersByStatus(status: number){
    return this.http.get<Order[]>(this.rootUrl+'/GetConfirmOrders/'+status)
  }
}

