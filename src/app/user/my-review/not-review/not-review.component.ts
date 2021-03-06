import { Component, OnInit } from '@angular/core';
import { Paging } from 'src/app/model/paging';
import { ProductNotReview, ProductReviewHistory } from 'src/app/model/evaluation';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { response } from 'src/app/model/response';
import { NgbModalWriteReviewComponent } from '../ngb-modal-write-review/ngb-modal-write-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as globals from 'src/globals';

@Component({
  selector: 'app-not-review',
  templateUrl: './not-review.component.html',
  styleUrls: ['./not-review.component.css']
})
export class NotReviewComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  paging ={} as Paging;
  products: ProductNotReview[] =[];
  countHistory = 0;
  currentPage = 1;
  server = globals.server;
  constructor(private evaluationService: EvaluationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getNotReview(1);
  }
  getNotReview(page: number){
    this.evaluationService.getNoteReview(this.user.id,page).subscribe((data:response)=>{
      if(!data.isError){
        this.paging = data.module.paging;
        this.products = data.module.products;
      }
    });
    this.evaluationService.getReviewHistotry(this.user.id,1).subscribe((data:response)=>{
      if(!data.isError){
        this.countHistory = data.module.paging.totalItems;
      }
    })
  }
  changePage(page:number){
    this.currentPage = page;
    this.getNotReview(page);
  }
  openEditReview(product: ProductNotReview){
    const modal = this.modalService.open(NgbModalWriteReviewComponent);

    modal.componentInstance.productId = product.productId;
    modal.componentInstance.productName = product.productName;
    modal.componentInstance.image = product.image
    modal.componentInstance.returnStatus.subscribe(data =>{
      if(data == 'success'){
        this.getNotReview(this.currentPage);
        modal.close();
      } 
    })
  }

}
