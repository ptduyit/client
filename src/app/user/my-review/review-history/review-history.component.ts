import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { Paging } from 'src/app/model/paging';
import { ProductReviewHistory, ProductNotReview } from 'src/app/model/evaluation';
import { response } from 'src/app/model/response';
import { NgbModalWriteReviewComponent } from '../ngb-modal-write-review/ngb-modal-write-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as globals from 'src/globals';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  styleUrls: ['./review-history.component.css']
})
export class ReviewHistoryComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  paging ={} as Paging;
  products: ProductReviewHistory[] =[];
  countNotReview = 0;
  currentPage = 1;
  server = globals.server;
  constructor(private evaluationService: EvaluationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getReviewHistotry(1);
  }
  getReviewHistotry(page:number){
    this.evaluationService.getReviewHistotry(this.user.id,page).subscribe((data:response)=>{
      if(!data.isError){
        this.paging = data.module.paging;
        this.products = data.module.products;
      }
    });
    this.evaluationService.getNoteReview(this.user.id,1).subscribe((data:response)=>{
      if(!data.isError){
        this.countNotReview = data.module.paging.totalItems;
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getReviewHistotry(page);
  }
  openEditReview(product: ProductReviewHistory){
    const modal = this.modalService.open(NgbModalWriteReviewComponent);
    modal.componentInstance.productId = product.productId;
    modal.componentInstance.productName = product.productName;
    modal.componentInstance.image = product.image;
    modal.componentInstance.evaluationId = product.evaluationId;
    modal.componentInstance.rate = product.rate;
    modal.componentInstance.content = product.content;
    modal.componentInstance.returnStatus.subscribe(data =>{
      if(data == 'success'){
        this.getReviewHistotry(this.currentPage);
        modal.close();
      }
     
    })
  }

}
