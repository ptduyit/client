import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";  
import { Product } from '../model/product';
import { ProductService } from '../shared/product.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { CartService } from '../shared/cart.service';
import { CartDetail } from '../model/cart-detail';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  id: number;
  product = {} as any;
  images = {} as any;
  userId = '';
  cartDetail: CartDetail = {} as any;
  private _success = new Subject<string>();
  successMessage: string;
  constructor(private proService: ProductService, private avRouter: ActivatedRoute,
     private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
      this.proService.getProductInformation(this.id).subscribe(data => this.product = data[0]);
    } 
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  buynow(){
    this.cartDetail.productId = this.product.productId;
    this.cartDetail.userId = this.userId;
    this.cartDetail.quantity = 1;
    this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
      this.router.navigate(['cart']);
    })
  }
  addcart(){
    this.cartDetail.productId = this.product.productId;
    this.cartDetail.userId = this.userId;
    this.cartDetail.quantity = 1;
    this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
      this._success.next(`Đã thêm sản phẩm vào giỏ`)
    })
  }

}
