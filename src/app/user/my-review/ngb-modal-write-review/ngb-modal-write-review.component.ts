import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductReviewHistory } from 'src/app/model/evaluation';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { response } from 'src/app/model/response';

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

  constructor(public activeModal: NgbActiveModal, private evaluationService: EvaluationService) { }

  ngOnInit() {
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
        this.returnStatus.emit('success');
      }
    })
  }

}
