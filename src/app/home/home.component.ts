import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductIndex } from '../model/product-index';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productIndex: ProductIndex[];

  constructor(private productService: ProductService, private title: Title) { }
  idproduct= 1;
  ngOnInit() {
    this.title.setTitle('Mua sắm, Điện thoại, Phụ kiện  | Cửa hàng trực tuyến');
    //this.getProductIndex();
  }
  getProductIndex(){
    this.productService.getProductIndex().subscribe((data: any) =>
    {
      this.productIndex = data;
    })
  }
}
