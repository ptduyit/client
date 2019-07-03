import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductIndex } from '../model/product-index';
import { Title } from '@angular/platform-browser';
import { SlideService } from '../service/slide.service';
import * as globals from 'src/globals';
import { response } from '../model/response';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productIndex: ProductIndex[] = [];
  slides = [] as any;
  server = globals.server;
  constructor(private productService: ProductService, private title: Title, private slideService: SlideService) { }
  idproduct= 1;
  ngOnInit() {
    this.title.setTitle('Mua sắm, Điện thoại, Phụ kiện  | Cửa hàng trực tuyến');
    this.getProductIndex();
    this.getSlide();
  }
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "prevArrow":"<div class='prev-slide-slick'>‹</div>",
    "nextArrow":"<div class='next-slide-slick'>›</div>",
  };
  getSlide(){
    this.slideService.getSlide().subscribe(data => {
      this.slides = data;
    })
  }
  getProductIndex(){
    this.productService.getProductShowIndex().subscribe((data: response) =>{
      if(!data.isError){
        this.productIndex = data.module;
      }
    })
  }
}
