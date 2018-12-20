import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductIndex } from '../model/product-index';
import { CartService } from '../shared/cart.service';
import { from } from 'rxjs';
import { CartDetail } from '../model/cart-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
  providers: [NgbModalConfig, NgbModal,NgbCarouselConfig]
})
export class ProductShowComponent implements OnInit {
  @Input() productIndex: ProductIndex;
  userId = '67f6955a-606b-419e-d9df-08d65316240f';
  cartDetail: CartDetail = {} as any;
  orderId: number;
  productId = 1;
  quantity = 1;
  status: number;
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(config: NgbModalConfig, private modalService: NgbModal,config1: NgbCarouselConfig,
    private cartService: CartService, private router: Router) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    //ảnh
    config1.interval = 5000;
    config1.wrap = false;
    config1.keyboard = false;
    config1.pauseOnHover = false;
  }

  open(content) {
    this.modalService.open(content);
  }
  ngOnInit() {
    
  }
  id=1;
  link_img:string="https://cf.shopee.vn/file/d91549f7093cf2f5f993cb13a9150773";
 

  addcart(){
    this.cartDetail.productId = this.productIndex.productId;
    this.cartDetail.userId = this.userId;
    this.cartDetail.quantity = 1;
    this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
      this.router.navigate(['cart']);
    })
  }

}
