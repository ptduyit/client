import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbCarouselConfig, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ProductIndex } from '../model/product-index';
import { CartService } from '../shared/cart.service';
import { CartDetail } from '../model/cart-detail';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
  providers: [NgbModalConfig, NgbModal,NgbCarouselConfig, NgbAlert]
})
export class ProductShowComponent implements OnInit {
  @Input() productIndex: ProductIndex;
  userId = '';
  cartDetail: CartDetail = {} as any;
  images = {} as any;
  private _success = new Subject<string>();
  successMessage: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal,config1: NgbCarouselConfig,
    private cartService: CartService, private router: Router, private ngAlert: NgbAlert) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    //ảnh
    config1.interval = 5000;
    config1.wrap = true;
    config1.keyboard = false;
    config1.pauseOnHover = true;
    config1.showNavigationArrows = true;
    config1.showNavigationIndicators = true;
  }

  open(content) {
    this.modalService.open(content);
  }
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.images = this.productIndex.productImage;

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  id=1; 
  buynow(){
    this.cartDetail.productId = this.productIndex.productId;
    this.cartDetail.userId = this.userId;
    this.cartDetail.quantity = 1;
    this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
      this.router.navigate(['cart']);
    })
  }
  addcart(){
    this.cartDetail.productId = this.productIndex.productId;
    this.cartDetail.userId = this.userId;
    this.cartDetail.quantity = 1;
    this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
      this._success.next(`Đã thêm sản phẩm vào giỏ`)
    })
  }

}
