import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { Title } from '@angular/platform-browser';
import { Paging } from 'src/app/model/paging';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { response } from 'src/app/model/response';
import { ToastrService } from 'ngx-toastr';
import * as globals from 'src/globals';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  orders: Order[] = [];
  paging ={} as Paging;
  option:number;
  currentPage = 1;
  searchOrderControl = new FormControl();
  queryParamSubscription: Subscription;
  server = globals.server;
  constructor(private orderService: OrderService, private title: Title, private route: ActivatedRoute, private toastr: ToastrService) {
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
    this.orderService.getOrderByIdUser(this.user.id,page,this.option).subscribe((data:response)=>{
      if(!data.isError){
        this.orders = data.module.orders;
        this.paging = data.module.paging;

      }
    })
  }
  cancelUser(order: Order){
    this.orderService.cancelOrderUser(this.user.id,order.orderId).subscribe((data:response)=>{
      if(!data.isError){
        this.getOrderUser(1);
        this.toastr.success("","Hủy đơn hàng thành công");
      }
      else{
        this.getOrderUser(1);
        switch(data.status){
          case 400: this.toastr.error("","Lỗi dữ liệu đầu vào");
          break;
          case 409: this.toastr.error("","Hủy thất bại, dữ liệu đã thay đổi");
          break;
          case 403: this.toastr.error("","Bạn không quyền hủy đơn hàng này");
          break;
          case 404: this.toastr.error("","Không tìm thấy đơn hàng");
          break;
        }
        
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getOrderUser(page);
  }

}
