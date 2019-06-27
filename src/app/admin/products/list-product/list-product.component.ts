import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AutoWidthCalculator } from 'ag-grid-community';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { response } from 'src/app/model/response';
import { CategoryService } from 'src/app/service/category.service';
import { Paging } from 'src/app/model/paging';
import { Subject, Subscription, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  products: Product[];
  categorySelect: any = [];
  categoryId = 0;
  paging = {} as Paging;
  status = "abc";
  currentPage = 1;
  size = 10;
  keyword = "";
  term$ = new Subject<string>();
  private searchSubscription: Subscription;
  constructor(private proService: ProductService, private router: Router, private title: Title, private categoryService: CategoryService) {
    this.title.setTitle('Quản lý sản phẩm')
  }

  ngOnInit() {
    this.categoryService.getCategorySelectAll().subscribe((data:response) => {
      if(!data.isError){
        this.categorySelect = data.module;
      }
      else console.log(data.message);
    });
    this.getProduct(1);
    this.searchSubscription = this.term$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.getProduct(1);
        return EMPTY;
      })).subscribe();
  }
  getProduct(page:number){
    this.proService.getProductManage(page,this.size,this.status,this.keyword,this.categoryId)
    .subscribe((data:response) => {
      if(!data.isError){
        this.products = data.module.products;
        this.paging = data.module.paging;
      }
    })
  }
  gotoLink(url:string){
    let fullurl = window.location.origin +'/products/'+ url
    window.open(fullurl,"_blank")

  }
  searchDelay(){
    this.term$.next(this.keyword)
  }
  changePage(page:number){
    this.currentPage = page;
    this.getProduct(page);
  }
  selectRadio(){
    this.currentPage = 1;
    this.getProduct(1);
  }
  selectCategory(){
    this.currentPage = 1;
    this.getProduct(1);
  }
  changeStatus(id:number, status: string){
    this.proService.updateStatus(id,status).subscribe((data:response)=>{
      if(!data.isError){
        let index = this.products.findIndex(x => x.productId === id);
        if(status === "discontinued"){
          this.products[index].discontinued = !this.products[index].discontinued;
        }
        if(status === "index"){
          this.products[index].displayIndex = !this.products[index].displayIndex;
        }
      }
    })
  }
  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }
  }

}
