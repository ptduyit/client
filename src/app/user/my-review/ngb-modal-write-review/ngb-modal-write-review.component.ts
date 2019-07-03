import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { response } from 'src/app/model/response';
import * as globals from 'src/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ngb-modal-write-review',
  templateUrl: './ngb-modal-write-review.component.html',
  styleUrls: ['./ngb-modal-write-review.component.css']
})
export class NgbModalWriteReviewComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  @Input() productId: number;
  @Input() productName: string;
  @Input() image: string;
  @Input() rate: number;
  @Input() content: string;
  @Input() evaluationId: number;
  @Output() returnStatus: EventEmitter<any> = new EventEmitter();
  server = globals.server;
  flag = false;
  constructor(public activeModal: NgbActiveModal, private evaluationService: EvaluationService, private toastr: ToastrService) { }

  ngOnInit() {
    if(this.rate){
      this.flag = true;
    }
  }
  onSubmit(){
    var review = {
      productId:this.productId,
      rate: this.rate,
      content:this.content,
      evaluationId:this.evaluationId,
      userId:this.user.id
    }
    this.evaluationService.postPutReview(review).subscribe((data:response)=>{
      if(!data.isError){
        if(this.flag){
          this.toastr.success(this.productName,"Chỉnh sửa thành công");
        }
        else{
          this.toastr.success(this.productName,"Đã đánh giá sản phẩm");
        }
        
        this.returnStatus.emit('success');
      }else{
        this.toastr.error("","Có lỗi khi đánh giá sản phẩm");
      }
    }, err => {
      this.toastr.error("","Lỗi không xác định");
    })
  }

}
