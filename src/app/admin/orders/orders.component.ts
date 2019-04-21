import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../model/order';
import { OrderDetail } from 'src/app/model/order-detail';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  orderDetail: OrderDetail[];
  status=1;
  flag = false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrderPending();
  }
  onChange(event){
    const value : number = event.target.value;
    this.status = value;
    this.flag = false;
    if(value == 1){
      this.getOrderPending();
    } else{
      this.getOrderAccept();
    }
    console.log(value);
  }
  getOrderPending(){
    this.orderService.getOrdersByStatus(1).subscribe( data => {
      this.orders = data;
      if(this.orders.length<1){
        this.flag = true;
      }
    })
  }
  getOrderAccept(){
    this.orderService.getOrdersByStatus(2).subscribe( data => {
      this.orders = data;
      if(this.orders.length<1){
        this.flag = true;
      }
    })
  }
  updateStatusOrder(id: number, f: number){
    if(f==1){
      if(this.status==1){
        var st = 2;
      }
      if(this.status==2){
        st=3
      }
      
      this.orderService.updateStatusOrder(id,st).subscribe( data =>{
        if(this.status==1){
          this.getOrderPending();
        }
        else{
          this.getOrderAccept();
        }
      })
    }
    else{
      this.orderService.updateStatusOrder(id,5).subscribe( data =>{
        if(this.status==1){
          this.getOrderPending();
        }
        else{
          this.getOrderAccept();
        }
      })
    }
    
  }
}
