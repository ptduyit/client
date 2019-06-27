import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class OrderImportService {

  constructor(private http: HttpClient) { }
  createOrder(userId: string,supplierId: any, id: number){
    let data = { userId: userId, supplierId: supplierId, productId: id}
    return this.http.post(globals.server+'api/admin/order-import',data);
  }
  addOrderDetail(productId: number, orderId: number){
    let data = {orderId: orderId, productId: productId}
    return this.http.post(globals.server+'api/admin/orderdetail-import', data);
  }
  getOrderById(id: number){
    return this.http.get(globals.server+'api/admin/order-import/'+id);
  }
  deleteOrderDetail(oid: number, pid: number){
    return this.http.delete(globals.server+'api/admin/order-import-detail/oid/'+oid+'/pid/'+pid);
  }
  tempOrder(id: number, order: any){
    return this.http.put(globals.server+'api/admin/order-import/'+id+'/temp',order);
  }
  saveOrder(id: number, order: any){
    return this.http.put(globals.server+'api/admin/order-import/'+id+'/save',order);
  }
  searchOrderImport(type:string,keyword:string,temporary:boolean,page:number){
    return this.http.get(globals.server+'api/admin/order-import?type='+type+'&keyword='+keyword+'&temporary='+temporary+'&page='+page);
  }
}
