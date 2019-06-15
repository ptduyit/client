import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/model/product-category';
import { CategoryService } from 'src/app/service/category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  productCategory: ProductCategory = {} as ProductCategory;
  errorMessage: string;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private title: Title) {}

  ngOnInit() {
    this.getCategory();
  }
  getCategory(){
    // const resolvedData = this.route.snapshot.data['dataResolve'];
    this.route.data.subscribe( data => {
      this.errorMessage = data.dataResolve.error;
      this.productCategory = data.dataResolve;
    })
  }
  setPage(page: number){
    this.categoryService.getProductCategoryByUrl(this.productCategory.categories[0].url,page)
    .subscribe( data => {
      this.productCategory = data;
    })
  }
}
