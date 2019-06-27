import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { AddressService } from '../service/address.service';
import { ShowAddressUser } from '../model/address';
import { NotificationsService } from 'angular2-notifications';
import { ProductService } from '../service/product.service';
import { DataShareService } from '../service/datashare.service';
import { response } from '../model/response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalSelectAddressComponent } from './ngb-modal-select-address/ngb-modal-select-address.component';
import { NgbModalNewAddressComponent } from './ngb-modal-new-address/ngb-modal-new-address.component';
import { from } from 'rxjs';
import { OrderService } from '../service/order.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import * as globals from 'src/globals';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId = localStorage.getItem('userId');
  carts: Cart[] = [];
  tempcarts: Cart[] =[];
  totalPrice = 0;
  order: Order = {} as any;
  address: ShowAddressUser;
  addId: number;
  flag = false;
  stock: number;
  productNumber: number;
  constructor(private cartService: CartService, private router: Router, private addressService: AddressService,
    private _service: NotificationsService, private productService: ProductService, private dataService: DataShareService,
    private modalService: NgbModal, private orderService: OrderService, private toastr: ToastrService,
    private title: Title) {
      this.title.setTitle("Giỏ hàng")
     }

  ngOnInit() {
    registerLocaleData( es );
    if (this.userId) {
      this.getCart();
      this.getAddressDefault();
      //this.getAllAddress();
    } 
    // else {
    //   this.flag = true;
    //   this.router.navigate(['login']);
    //   this._service.info('Vui lòng đăng nhập', '',
    //     {
    //       timeOut: 3000,
    //       showProgressBar: true,
    //       pauseOnHover: false,
    //       clickToClose: true,
    //       maxLength: 10
    //     });
    // }


  }
  addAddress() {
    this.router.navigate(['user/add-address/']);
  }
  // getAllAddress() {
  //   this.addressService.getAllAddress(this.userId)
  //     .subscribe(data => {
  //       this.addresses = data;
  //       this.addresses.forEach((item, index) => {
  //         if (item.isDefault === true) {
  //           this.addId = item.addressId;
  //         }
  //       })
  //     })
  // }
  getAddressDefault() {
    this.addressService.getAddressDefault(this.userId).subscribe((data: response) => {
      if (!data.isError) {
        this.address = data.module;
      }
    })
  }
  getCart() {

    this.cartService.getCart(this.userId).subscribe((data: response) => {
      if (!data.isError) {
        this.tempcarts = data.module;
        this.tempcarts.forEach(product => {
          this.tempcarts.find(item => item.productId === product.productId).image = product.image == null ? 'assets/images/placeholder.png' : globals.server + product.image;
          if (product.discontinued || product.stock < 1) {
            this.toastr.warning(product.productName,'Ngưng bán hoặc hết hàng');
            console.log('sản phẩm ' + product.productName + ' đã ngưng bán hoặc hết hàng');
            // this.cartService.updateQuantity(this.userId,product.productId,1).subscribe((rs: response) =>{
            //   if(rs.isError){
            //     console.log('Lỗi '+rs.message);
            //   }
            // });
            this.tempcarts = this.tempcarts.filter(f => f.productId !== product.productId);
            this.cartService.deleteItem(this.userId, product.productId).subscribe((rs: response) => {
              if (rs.isError) {
                console.log('Lỗi ' + rs.message);
              }
              else{
                // this.tempcarts = this.tempcarts.filter(f => f.productId !== product.productId);
                // this.carts = this.tempcarts;
                // this.calculatePrice();
              }
            });
          }
          else if (product.quantity > product.stock) {
            this.toastr.info(product.productName,'Số Lượng Đã Thay Đổi');
            console.log('số lượng đã thay đổi ' + product.productName);
            this.tempcarts.find(item => item.productId === product.productId).quantity = product.stock;
          }
          if (this.carts.length > 0) {
            if (this.carts.find(e => e.productId === product.productId).unitPrice !== product.unitPrice) {
              this.toastr.info(product.productName,'Giá Đã Thay Đổi');
              console.log('giá ' + product.productName + ' đã thay đổi');
            }
          }
        });
        
        this.carts = this.tempcarts; //success
        
        // this.cartService.getTotalQuantity(this.userId).subscribe((data: response) => {
        //   if (!data.isError) {
        //     this.totalPrice = data.module;
        //   }
        // });
        this.calculatePrice();
        //this.spinner.hide();
      }


      // this.carts = data.module;
      // data.forEach(e => {
      //   this.productService.getStockProduct(e.productId).subscribe((data:any) => {
      //     if(data.stock < 1){
      //       this.carts = this.carts.filter(f => f.productId !== e.productId);
      //       this.cartService.deleteItem(this.userId,e.productId).subscribe(data => {
      //         this._service.warn(
      //           'Có sản phẩm đã bị xóa khỏi giỏ hàng','do hết hàng hoặc tạm ngưng bán',
      //           {
      //             position: ["bottom", "right"],
      //             timeOut: 3000,
      //             showProgressBar: true,
      //             pauseOnHover: false,
      //             clickToClose: true,
      //             maxLength: 10
      //           });

      //           this.totalPrice = this.carts.reduce( function( runningValue: number, cart: Cart){
      //             return runningValue + (cart.unitPrice * cart.quantity);
      //           },0);
      //           this.productNumber = this.carts.reduce( function( runningValue: number, cart: Cart){

      //             return runningValue + cart.quantity;
      //           },0);
      //           this.dataService.updateNumberProduct(this.productNumber);

      //       });
      //     }
      //   });
      // });
      // this.totalPrice = this.carts.reduce( function( runningValue: number, cart: Cart){
      //   return runningValue + (cart.unitPrice * cart.quantity);
      // },0);
      // this.productNumber = this.carts.reduce( function( runningValue: number, cart: Cart){

      //   return runningValue + cart.quantity;
      // },0);
      // this.dataService.updateNumberProduct(this.productNumber);
    },
      err => {
        
      })
  }
  deleteCartDetail(productId: number) {
      this.cartService.deleteItem(this.userId, productId)
        .subscribe((data: response) => {
          if (!data.isError)
            this.getCart();
        });
    
  }

  calculatePrice() {
    this.totalPrice = this.carts.reduce(function (runningValue: number, cart: Cart) {
      return runningValue + (cart.unitPrice * cart.quantity);
    }, 0);
    this.productNumber = this.carts.reduce(function (runningValue: number, cart: Cart) {
      return runningValue + cart.quantity;
    }, 0);
    this.dataService.updateNumberProduct(this.productNumber);
  }
  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(this.userId, productId, quantity).subscribe((data: response) => {
      if (data.isError) {
        console.log('Lỗi ' + data.message);
        this.getCart();
      }
    });
    this.calculatePrice();
  }
  isNumberKey(evt, product: Cart) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var start = evt.target.selectionStart;
    var end = evt.target.selectionEnd;
    var old = String(evt.target.value);
    //delete, backspace
    if (charCode == 8 || charCode == 46) {
      var rs = '';
      if (start !== end)
        rs = old.slice(0, start) + old.slice(end, old.length);
      else {
        if (charCode == 8)
          rs = old.slice(0, start - 1) + old.slice(end, old.length);
        else
          rs = old.slice(0, start) + old.slice(end + 1, old.length);
      }
      if (Number(rs) === 0) {
        this.carts.find(e => e.productId === product.productId).quantity = 1;
        this.updateQuantity(product.productId, 1);
        return false;
      }
    }
    if (charCode == 48 && start === 0) {
      return false;
    }
    //max quantity
    if (charCode > 47 && charCode < 58) {
      let max = 100 > product.stock ? product.stock : 100;
      var rs = old.slice(0, start) + String(evt.key) + old.slice(end, old.length);
      // if(Number(rs)===Number(old))
      //   return false;
      if (Number(rs) === 0) {
        this.carts.find(e => e.productId === product.productId).quantity = 1;
        this.updateQuantity(product.productId, 1);
        return false;
      }
      if (Number(rs) < max) {
        this.updateQuantity(product.productId, Number(rs));
        return true;
      }

      this.carts.find(e => e.productId === product.productId).quantity = max;
      this.updateQuantity(product.productId, max);
      return false;
    }

    if (charCode == 40)
      this.minus(product);

    if (charCode == 38) {
      this.plus(product);
      return false;
    }

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)
      && (charCode < 37 || charCode > 40) && charCode != 231)
      return false;
    return true;
  }
  minus(product: Cart) {
    if (this.carts.find(e => e.productId === product.productId).quantity > 1) {
      let quantity = --this.carts.find(e => e.productId === product.productId).quantity;
      this.updateQuantity(product.productId, quantity);
    }

  }
  plus(product: Cart) {
    let max = 100 > product.stock ? product.stock : 100;
    if (this.carts.find(e => e.productId === product.productId).quantity < max) {
      let quantity = ++this.carts.find(e => e.productId === product.productId).quantity;
      this.updateQuantity(product.productId, quantity);
    }
  }
  selectText(e) {
    if (e.target.value == 1) {
      e.target.select();
    }
  }
  keyupselectText(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode == 8 || charCode == 46) && e.target.value == 1) {
      e.target.select();
    }
  }
  checkOut() {
    if (!this.address) {
      this.router.navigate(['user/add-address']);
      this._service.success(
        'Vui lòng thêm địa chỉ đặt hàng', '',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });

    }
    else {
      this.cartService.checkOut(this.carts, this.address.addressId).subscribe((data:response) => {
        if(!data.isError){

        }
        else{
          console.log(data.message);
          this.getCart();
        }
        // this.dataService.updateNumberProduct(0);
        // this.router.navigate(['home']);
      },
        err => {
          this._service.error('Đặt hàng thất bại',
            'Đã hết hàng hoặc sản phẩm ngưng bán',
            {
              position: ["bottom", "right"],
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            });
        });
    }
  }
  openSelectAddress() {
    const modalRef = this.modalService.open(NgbModalSelectAddressComponent, { windowClass: 'modal-holder',size: "lg"});
    modalRef.componentInstance.returnAddress.subscribe((data: ShowAddressUser) => {
      this.address = data;
      modalRef.close();
    })
  }
}
