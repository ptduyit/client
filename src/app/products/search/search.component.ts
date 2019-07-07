import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Paging } from 'src/app/model/paging';
import { ProductIndex } from 'src/app/model/product-index';
import { ProductService } from 'src/app/service/product.service';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  queryParamSubscription: Subscription;
  sort: string;
  keyword: string;
  paging = {} as Paging;
  products: ProductIndex[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.products = data.searchResolve.module.products;
      this.paging = data.searchResolve.module.paging;
    });
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.keyword = params.get('q');
      this.sort = params.get('sort');
      this.getProduct(1);
    });

  }
  getProduct(page:number){
    this.productService.productSearch(this.keyword,page,this.sort).subscribe((data:response)=>{
      if(!data.isError){
        this.products = data.module.products;
        this.paging = data.module.paging;
      }
    })
  }
  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }
  isLinkActive(sort:string){
    return sort === this.sort
  }
}
