import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { OrderDetail } from '../../model/order-detail';
import { Title } from '@angular/platform-browser';
import { Paging } from 'src/app/model/paging';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId = localStorage.getItem('userId');
  orders: Order[] = [];
  paging ={} as Paging;
  option:number;
  currentPage = 1;
  searchOrderControl = new FormControl();
  queryParamSubscription: Subscription;

  constructor(private orderService: OrderService, private title: Title, private route: ActivatedRoute) {
    this.title.setTitle('Đơn hàng của tôi');
   }

  ngOnInit() {
    registerLocaleData( es );
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      let option = Number(params.get('option'));
      if(isNaN(option)){
        this.option = 0;
      }
      else if(option < 0 || option > 5){
        this.option = 0;
      }
      else{
        this.option = option;
      }
      console.log(this.option);
      this.getOrderUser(1);
    });
  }
  isLinkActive(option:number){
    return option === this.option
  }
  getOrderUser(page:number){
    this.orderService.getOrderByIdUser(this.userId,page,this.option).subscribe((data:response)=>{
      if(!data.isError){
        this.orders = data.module.orders;
        this.paging = data.module.paging;
        
      }
    })
  }
  cancelUser(order: Order){
    this.orderService.cancelOrderUser(this.userId,order.orderId).subscribe((data:response)=>{
      if(!data.isError){
        this.getOrderUser(1);
      }
      else{
        this.getOrderUser(1);
        console.log(data.message)
        
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getOrderUser(page);
  }

}
