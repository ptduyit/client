import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { response } from 'src/app/model/response';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import * as globals from 'src/globals';
import { OrderImport } from 'src/app/model/order-import';

@Component({
  selector: 'app-ngb-modal-detail-order-import',
  templateUrl: './ngb-modal-detail-order-import.component.html',
  styleUrls: ['./ngb-modal-detail-order-import.component.css']
})
export class NgbModalDetailOrderImportComponent implements OnInit {

  @Input() order: OrderImport;
  server = globals.server;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    registerLocaleData( es );
    
  }
  gotoLink(url:string){
    let fullurl = window.location.origin +'/products/'+ url
    window.open(fullurl,"_blank")

  }
}
