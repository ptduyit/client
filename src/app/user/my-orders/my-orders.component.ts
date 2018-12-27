import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../model/order';
import { OrderDetail } from '../../model/order-detail';
import { from } from 'rxjs';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId = '';
  orders: Order[];
  orderDetail: OrderDetail[];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getOrderUser();
  }
  getOrderUser(){
    this.orderService.getOrderByIdUser(this.userId)
    .subscribe((data) => {
      this.orders = data;
      console.log(this.orders);
    })
  }
}
