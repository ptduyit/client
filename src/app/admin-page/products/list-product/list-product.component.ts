import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Product } from '../../../model/product';
import { ProductService } from '../../../shared/product.service'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[];
  constructor(private proService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }
  getProduct(){
    this.proService.getProducts()
    .subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  deletePro(productId){
    var ans = confirm("Do you want to delete product with Id: " + productId);  
    if(ans){
      this.proService.deleteProduct(productId)
      .subscribe(data => {
        this.getProduct();
      });
    }
    
  }
}
