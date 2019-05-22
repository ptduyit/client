import { Component, OnInit, Input } from '@angular/core';
import { ProductIndex } from 'src/app/model/product-index';
import { CartService } from 'src/app/service/cart.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Cart } from 'src/app/model/cart';
import { DataShareService } from 'src/app/service/datashare.service';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit {
  @Input() productIndex: ProductIndex;
  
  cartDetail: CartDetail = {} as any;
  userId = localStorage.getItem('userId');
  productNumber: number;
  constructor(private cartService: CartService, private router: Router,
     private _service: NotificationsService, private dataService: DataShareService) {

  }

  ngOnInit() {
  }
}
