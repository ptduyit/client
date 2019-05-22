import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getOrders(){
    return this.http.get<Order[]>('https://localhost:44354/api/Orders/GetAllOrders');
  }
  getOrderByIdUser(id: string){
    return this.http.get<Order[]>('https://localhost:44354/api/Orders/GetOrderByIdUser/' + id);
  }

  createOrder(Order: Order){
    return this.http.post('https://localhost:44354/api/Orders/PostOrders', Order);
  }
  updateStatusOrder(id: number, status: number){
    return this.http.get('https://localhost:44354/api/Orders/PutConfirmOrders/'+id+'/'+status);
  }
  getOrdersByStatus(status: number){
    return this.http.get<Order[]>('https://localhost:44354/api/Orders/GetConfirmOrders/'+status)
  }
}

