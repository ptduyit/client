import { Component, OnInit, Input } from '@angular/core';
import { EvaluationService } from 'src/app/shared/evaluation.service';
import { Evaluation } from 'src/app/model/evaluation';
import { Paging } from 'src/app/model/paging';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  @Input() productId: number;
  userId = localStorage.getItem('userId');
  evaluations: Evaluation[];
  p:number=1;
  paging: Paging;
  star: any;
  size: number = 3;
  averageStar: number;
  max: number;
  constructor(private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.getEvaluation(1);
  }

  getEvaluation(page: number){
    this.evaluationService.getEvaluation(this.productId,page,this.size).subscribe((data:any) => {
      this.evaluations = data.items;
      this.paging = data.paging;
      this.p = page;
      this.star = data.star;
      this.max = this.star[0]+this.star[1]+this.star[2]+this.star[3]+this.star[4]
      this.averageStar = (this.star[0]+this.star[1]*2+this.star[2]*3+this.star[3]*4+this.star[4]*5)/this.max;
      
    })
  }
}
