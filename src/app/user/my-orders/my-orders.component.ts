import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { OrderDetail } from '../../model/order-detail';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId = '';
  flag = false;
  orders: Order[];
  orderDetail: OrderDetail[];
  constructor(private orderService: OrderService, private title: Title) {
    this.title.setTitle('Đơn hàng của tôi');
   }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getOrderUser();
  }
  getOrderUser(){
    this.orderService.getOrderByIdUser(this.userId)
    .subscribe((data) => {
      this.orders = data;
      if(this.orders.length<1){
        this.flag = true;
      }
    })
  }
}
