import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { response } from 'src/app/model/response';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import * as globals from 'src/globals';
@Component({
  selector: 'app-ngb-modal-detail-order',
  templateUrl: './ngb-modal-detail-order.component.html',
  styleUrls: ['./ngb-modal-detail-order.component.css']
})
export class NgbModalDetailOrderComponent implements OnInit {
  @Input() order: Order;
  @Output() returnStatus: EventEmitter<any> = new EventEmitter();
  history ={} as any;
  server = globals.server;
  constructor(public activeModal: NgbActiveModal,private orderService: OrderService) { }

  ngOnInit() {
    registerLocaleData( es );
    this.checkHistory();
  }
  checkHistory(){
    this.orderService.checkHistoryBuy(this.order.userId).subscribe((data:response)=>{
      if(!data.isError){
        this.history = data.module;
      }
      
    })
  }
  processOrderStatus(){
    this.returnStatus.emit(this.order.status+1);
  }
  cancelUser(){
    this.returnStatus.emit(6);
  }
  cancelShop(){
    this.returnStatus.emit(5);
  }
  gotoLink(url:string){
    let fullurl = window.location.origin +'/products/'+ url
    window.open(fullurl,"_blank")

  }
}
