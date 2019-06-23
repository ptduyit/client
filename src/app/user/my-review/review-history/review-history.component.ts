import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { Paging } from 'src/app/model/paging';
import { ProductReviewHistory, ProductNotReview } from 'src/app/model/evaluation';
import { response } from 'src/app/model/response';
import { NgbModalWriteReviewComponent } from '../ngb-modal-write-review/ngb-modal-write-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  styleUrls: ['./review-history.component.css']
})
export class ReviewHistoryComponent implements OnInit {
  userId = localStorage.getItem('userId');
  paging ={} as Paging;
  products: ProductReviewHistory[] =[];
  countNotReview = 0;
  currentPage = 1;
  constructor(private evaluationService: EvaluationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getReviewHistotry();
  }
  getReviewHistotry(){
    this.evaluationService.getReviewHistotry(this.userId,this.currentPage).subscribe((data:response)=>{
      if(!data.isError){
        this.paging = data.module.paging;
        this.products = data.module.products;
      }
    });
    this.evaluationService.getNoteReview(this.userId,1).subscribe((data:response)=>{
      if(!data.isError){
        this.countNotReview = data.module.paging.totalItems;
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getReviewHistotry();
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
        this.getReviewHistotry();
        modal.close();
      }
     
    })
  }

}
