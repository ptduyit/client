import { Component, OnInit, Input } from '@angular/core';
import { ProductIndex } from 'src/app/model/product-index';
import { CartService } from 'src/app/service/cart.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { DataShareService } from 'src/app/service/datashare.service';
import * as globals from 'src/globals';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit {
  @Input() productIndex: ProductIndex;
  
  cartDetail: CartDetail = {} as any;
  user = JSON.parse(localStorage.getItem('user'));
  productNumber: number;
  constructor() {
  }

  ngOnInit() {
    registerLocaleData( es );
    if(this.productIndex.image === null){
      this.productIndex.image = 'assets/images/placeholder.png';
    }
    else{
      this.productIndex.image = globals.server+this.productIndex.image;
    }
  }
}
