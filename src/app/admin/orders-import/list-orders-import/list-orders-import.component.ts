import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderImportService } from 'src/app/service/order-import.service';
import { OrderImportManage } from 'src/app/model/order-import';
import { response } from 'src/app/model/response';
import { Subject, EMPTY, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Paging } from 'src/app/model/paging';

@Component({
  selector: 'app-list-orders-import',
  templateUrl: './list-orders-import.component.html',
  styleUrls: ['./list-orders-import.component.css']
})
export class ListOrdersImportComponent implements OnInit,OnDestroy {
  type = "order";
  keyword = "";
  temporary= false;
  currentPage = 1;
  paging ={} as Paging;
  orders: OrderImportManage[] = [];
  term$ = new Subject<string>();
  private searchSubscription: Subscription;
  constructor(private title: Title, private orderService: OrderImportService) {
    this.title.setTitle('Quản lý đơn nhập hàng');
   }

  ngOnInit() {
    this.searchOrder(1);
    this.searchSubscription = this.term$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.searchOrder(1);
        return EMPTY;
      })).subscribe();
  }
  searchOrder(page:number){
    this.orderService.searchOrderImport(this.type,this.keyword,this.temporary,page).subscribe((data:response)=>{
      if(!data.isError){
        this.orders = data.module.orders;
        this.paging = data.module.paging;
      }
    })
  }
  selectOrder(){
    this.currentPage = 1;
    this.searchOrder(1);
  }
  searchDelay(){
    this.term$.next(this.keyword)
  }
  changePage(page:number){
    this.currentPage = page;
    this.searchOrder(page);
  }
  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }
  }
}
