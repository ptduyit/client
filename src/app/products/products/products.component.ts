import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { DataShareService } from 'src/app/service/datashare.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import * as signalR from "@aspnet/signalr";
import { response } from 'src/app/model/response';
import * as globals from 'src/globals';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  server = globals.server;
  show = false;
  mainImage = 'assets/images/placeholder.png';
  id: number;
  product = {} as any;
  user = JSON.parse(localStorage.getItem('user'));
  cartDetail = {} as CartDetail;
  productNumber: number;
  quantity = 1;
  hubConnection: signalR.HubConnection;
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService, private router: Router, private toastr: ToastrService,
    private dataService: DataShareService, private title: Title) { }

  // ngx-image-zoom
  // this.thumbWidth = this.imageThumbnail.nativeElement.width;
  //     let ratio = (this.imageThumbnail.nativeElement.naturalWidth / this.imageThumbnail.nativeElement.naturalHeight);
  //     this.thumbHeight = this.thumbWidth / ratio;
  ngOnInit() {
    //this.ngxService.start();
    registerLocaleData(es);
    this.route.data.subscribe( data => {
      this.product = data.productResolve.module;
      this.product.summary = this.toList(this.product.summary);
      this.id = this.product.productId;
      this.title.setTitle(this.product.productName);
      if (this.product.productImages.length > 0) {
        this.mainImage = globals.server + this.product.productImages[0].url;
      }
      else{
        this.mainImage = 'assets/images/placeholder.png';
      }
    })
    // if (this.route.snapshot.params["id"]) {
    //   this.id = this.route.snapshot.params["id"];
    //   this.productService.getProductInformation(this.id).subscribe((data: response) => {
    //     if (!data.isError) {
    //       this.ngxService.stop();
    //       this.title.setTitle(data.module.productName);
    //       this.product = data.module;
    //       if (data.module.productImages.length > 0) {
    //         this.mainImage = globals.server + data.module.productImages[0].url;
    //       }
    //     }

    //   });
    // }
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(globals.server + 'echo').build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    this.hubConnection.on("stockproduct" + String(this.id), (msg) => {
      this.product.stock = msg;
      if (this.quantity > msg) {
        this.quantity = msg;
      }
      console.log(msg);
    });

  }
  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 5,

    "infinite": false
  };
  toList(text:string): string{
    var item = text.split('\n');
    var output = '';
    for(var i=0; i < item.length;i++){
      output = output + '<li>'+item[i]+'</li>';
    }
    return output;
  }
  changeimage(e) {
    if (this.mainImage !== e.target.currentSrc) {
      this.mainImage = e.target.currentSrc;
      console.log(e.target.currentSrc);

    }
  }
  minus() {
    if (this.quantity > 1)
      this.quantity--;
  }
  plus() {
    let max = 100 > this.product.stock ? this.product.stock : 100;
    if (this.quantity < max)
      this.quantity++;
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
  isNumberKey(evt) {
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
        this.quantity = 1;
        return false;
      }
    }
    if (charCode == 48 && start === 0) {
      return false;
    }
    //max quantity
    if (charCode > 47 && charCode < 58) {
      let max = 100 > this.product.stock ? this.product.stock : 100;
      var rs = old.slice(0, start) + String(evt.key) + old.slice(end, old.length);
      // if(Number(rs)===Number(old))
      //   return false;
      if (Number(rs) === 0) {
        this.quantity = 1;
        return false;
      }
      if (Number(rs) < max)
        return true;
      this.quantity = max;
      return false;
    }

    if (charCode == 40)
      this.minus();

    if (charCode == 38) {
      this.plus();
      return false;
    }

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)
      && (charCode < 37 || charCode > 40) && charCode != 231)
      return false;
    return true;
  }
  buynow() {
    if (this.user) {
      this.cartDetail.productId = this.id;
      this.cartDetail.userId = this.user.id;
      this.cartDetail.quantity = this.quantity;
      this.cartService.addItem(this.cartDetail).subscribe((data: response) => {
        if (!data.isError) {
          this.cartService.getTotalQuantity(this.user.id).subscribe((rs: response) => {
            if (!rs.isError) {
              this.dataService.updateNumberProduct(rs.module);
            }
          });
          console.log('success');
          this.router.navigate(['cart']);
        }
        else {
          console.log('error');
        }
      });
    } else {
      this.router.navigate(['login']);
      this.toastr.info("","Vui lòng đăng nhập");
    }
  }
  addcart() {
    if (this.user) {
      this.cartDetail.productId = this.id;
      this.cartDetail.userId = this.user.id;
      this.cartDetail.quantity = this.quantity;
      this.cartService.addItem(this.cartDetail).subscribe((data: response) => {
        if (!data.isError) {
          this.cartService.getTotalQuantity(this.user.id).subscribe((rs: response) => {
            if (!rs.isError) {
              this.dataService.updateNumberProduct(rs.module);
            }
          });
          console.log('success');
          //thong bao thanh cong
        }
        else {
          console.log('error');
          //thong bao loi
        }
      });
    } else {
      this.router.navigate(['login']);
      this.toastr.info("","Vui lòng đăng nhập");
    }

  }

}
