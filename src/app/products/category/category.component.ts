import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory, Breadcrumb } from 'src/app/model/product-category';
import { CategoryService } from 'src/app/service/category.service';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {
  
  queryParamSubscription: Subscription
  productCategory: ProductCategory = {} as ProductCategory;

  categoryCurrent ={} as Breadcrumb;
  order: string;
  constructor(private route: ActivatedRoute,private router: Router, private categoryService: CategoryService, private title: Title) {}

  ngOnInit() {
    this.getCategory();
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.order = params.get('order');
      if(this.order){
        this.setPage(1);
      }
    });
  }
  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }
  getCategory(){
    // const resolvedData = this.route.snapshot.data['dataResolve'];
    this.route.data.subscribe( data => {
      this.productCategory = data.dataResolve.module;
      this.categoryCurrent = this.productCategory.breadcrumbs[this.productCategory.breadcrumbs.length - 1];
      this.title.setTitle(this.categoryCurrent.label+ ' | Beeshop.com');
    })
  }
  setPage(page: number){
    this.categoryService.getProductCategoryByUrl(this.route.snapshot.params.url,page,this.order)
    .subscribe( (data:response) => {
      if(!data.isError){
        this.productCategory = data.module;
      }
    })
  }
  isLinkActive(order:string){
    return order === this.order
  }
}
