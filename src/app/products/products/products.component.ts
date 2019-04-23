import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/shared/product.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartService } from 'src/app/shared/cart.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { NotificationsService } from 'angular2-notifications';
import { Cart } from 'src/app/model/cart';
import { DataShareService } from 'src/app/shared/datashare.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  show = false;
  id: number;
  product: Product = {} as any;
  images = {} as any;
  userId = localStorage.getItem('userId');
  cartDetail: CartDetail = {} as any;
  productNumber: number;
  constructor(private proService: ProductService, private avRouter: ActivatedRoute,
    private cartService: CartService, private router: Router, private _service: NotificationsService, private dataService: DataShareService) { }

  ngOnInit() {
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
      this.proService.getProductInformation(this.id).subscribe(data => this.product = data);
    }

  }
  buynow() {
    if (this.userId) {
      this.cartDetail.productId = this.product.productId;
      this.cartDetail.userId = this.userId;
      this.cartDetail.quantity = 1;
      this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
        this.router.navigate(['cart']);
      })
    } else {
      this.router.navigate(['login']);
      this._service.info('Bạn phải đăng nhập trước khi mua hàng', '',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
    }
  }
  addcart() {
    if (this.userId) {
      this.cartDetail.productId = this.product.productId;
      this.cartDetail.userId = this.userId;
      this.cartDetail.quantity = 1;
      this.cartService.createCartDetail(this.cartDetail).subscribe(data => {
        this._service.success(
          'Đã thêm sản phẩm vào giỏ', '',
          {
            position: ["bottom", "right"],
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          }
        );

        this.cartService.getCart(this.userId).subscribe((data : Cart[]) =>{
          this.productNumber = data.reduce( function( runningValue: number, cart: Cart){
            return runningValue + cart.quantity;
          },0);
          this.dataService.updateNumberProduct(this.productNumber);
        });
      });
    } else {
      this.router.navigate(['login']);
      this._service.info('Bạn phải đăng nhập trước khi mua hàng', '',
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
