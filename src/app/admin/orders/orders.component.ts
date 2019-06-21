import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { OrderDetail } from 'src/app/model/order-detail';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/app/model/response';
import { Paging } from 'src/app/model/paging';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalDetailOrderComponent } from './ngb-modal-detail-order/ngb-modal-detail-order.component';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail[];
  paging ={} as Paging;
  option:number;
  currentPage = 1;
  size = 10;
  sort = "datedesc";
  queryParamSubscription: Subscription
  constructor(private orderService: OrderService, private title: Title, private route: ActivatedRoute,
    private router: Router,private modalService: NgbModal) {
    this.title.setTitle('Quản lý đơn đặt hàng');
   }

  ngOnInit() {
    registerLocaleData( es );
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      let option = Number(params.get('option'));
      if(isNaN(option)){
        this.option = 0;
      }
      else if(option < 0 || option > 6){
        this.option = 0;
      }
      else{
        this.option = option;
      }
      let size = Number(params.get('size'));
      if(isNaN(size)){
        this.size = 10;
      }
      else if(size < 10){
        this.size = 10;
      }
      else{
        this.size = size;
      }
      
      if(params.get('sort')==null){
        this.sort = "datedesc"
      }
      else{
        this.sort = params.get('sort');
      }
      console.log(this.option);
      this.getOrder(1,0);
    });
  }
  isLinkActive(option:number){
    return option === this.option
  }
  getOrder(page:number,id:number){
    this.orderService.getOrders(this.option,page,id,this.size,this.sort).subscribe((data:response)=>{
      if(!data.isError){
        this.orders = data.module.orders;
        this.paging = data.module.paging;
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getOrder(page,0);
  }
  changeSize(event){
    let size = event.target.value;
    this.router.navigate(['/admin/orders'],{ queryParams: { size: this.size}, queryParamsHandling: 'merge' })
  }
  changeSort(event){
    let sort = event.target.value;
    this.router.navigate(['/admin/orders'],{ queryParams: { sort: this.sort}, queryParamsHandling: 'merge' })
  }
  processOrderStatus(order: Order){
    console.log(order);
    this.orderService.updateStatusOrder(order.orderId,order.status+1).subscribe((data:response)=>{
      if(!data.isError){
        this.getOrder(1,0);
      }
    })
  }
  cancelShop(order: Order){
    this.orderService.updateStatusOrder(order.orderId,6).subscribe((data:response)=>{
      if(!data.isError){
        this.getOrder(1,0);
      }
    })
  }
  cancelUser(order: Order){
    this.orderService.updateStatusOrder(order.orderId,7).subscribe((data:response)=>{
      if(!data.isError){
        this.getOrder(1,0);
      }
    })
  }
  openDetail(order: Order){
    const modal = this.modalService.open(NgbModalDetailOrderComponent,{ size: 'lg' });
    modal.componentInstance.order = order;
    modal.componentInstance.returnStatus.subscribe(data =>{
      this.orderService.updateStatusOrder(order.orderId,data).subscribe((rs: response)=>{
        if(!data.isError){
          this.getOrder(1,0);
        }
      });
      modal.close();
    })
  }
  
}
