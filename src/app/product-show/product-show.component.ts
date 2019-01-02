import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbCarouselConfig, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ProductIndex } from '../model/product-index';
import { CartService } from '../shared/cart.service';
import { CartDetail } from '../model/cart-detail';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
  providers: [NgbModalConfig, NgbModal,NgbCarouselConfig]
})
export class ProductShowComponent implements OnInit {
  @Input() productIndex: ProductIndex;
  
  cartDetail: CartDetail = {} as any;
  images = {} as any;
  userId = localStorage.getItem('userId');
  constructor(config: NgbModalConfig, private modalService: NgbModal,config1: NgbCarouselConfig,
    private cartService: CartService, private router: Router, private _service: NotificationsService) {
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
    
    this.images = this.productIndex.productImage;
  }

  buynow(){
    if(this.userId){
      this.cartDetail.productId = this.productIndex.productId;
      this.cartDetail.userId = this.userId;
      this.cartDetail.quantity = 1;
      this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
        this.router.navigate(['cart']);
      })
    } else{
      this.router.navigate(['login']);
      this._service.info('Bạn phải đăng nhập trước khi mua hàng','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
    }
    
  }
  addcart(){
    if(this.userId){
      this.cartDetail.productId = this.productIndex.productId;
      this.cartDetail.userId = this.userId;
      this.cartDetail.quantity = 1;
      this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
        
        this._service.success(
          'Đã thêm sản phẩm vào giỏ',
          '',
          {
            position: ["bottom", "right"],
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          }
        );
      })
    } else {
      this.router.navigate(['login']);
      this._service.info('Bạn phải đăng nhập trước khi mua hàng','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
    }
    
  }

}
