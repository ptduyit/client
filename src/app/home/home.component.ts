import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductIndex } from '../model/product-index';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
