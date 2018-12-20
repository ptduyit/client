import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ProductIndex } from '../model/product-index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  productIndex: ProductIndex[];

  constructor(private productService: ProductService) { }
  idproduct= 1;
  ngOnInit() {
    this.getProductIndex();
  }
  getProductIndex(){
    this.productService.getProductIndex().subscribe((data: ProductIndex[]) =>
    {
      this.productIndex = data;
    })
  }
}
