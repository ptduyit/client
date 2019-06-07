import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderImportService {

  constructor(private http: HttpClient) { }
  createOrder(userId: string,supplierId: any, id: number){
    let data = { userId: userId, supplierId: supplierId, productId: id}
    return this.http.post('https://localhost:44354/api/admin/order-import',data);
  }
  addOrderDetail(productId: number, orderId: number){
    let data = {orderId: orderId, productId: productId}
    return this.http.post('https://localhost:44354/api/admin/orderdetail-import', data);
  }
  getOrderById(id: number){
    return this.http.get('https://localhost:44354/api/admin/order-import/'+id);
  }
  deleteOrderDetail(oid: number, pid: number){
    return this.http.delete('https://localhost:44354/api/admin/order-import-detail/oid/'+oid+'/pid/'+pid);
  }
  tempOrder(id: number, order: any){
    return this.http.put('https://localhost:44354/api/admin/order-import/'+id+'/temp',order);
  }
  saveOrder(id: number, order: any){
    return this.http.put('https://localhost:44354/api/admin/order-import/'+id+'/save',order);
  }
}
