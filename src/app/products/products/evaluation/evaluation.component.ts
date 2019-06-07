import { Component, OnInit, Input } from '@angular/core';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { Evaluations, Comments, Evaluation } from 'src/app/model/evaluation';
import { Paging } from 'src/app/model/paging';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  @Input() productId: number;
  userId = localStorage.getItem('userId');
  data:Evaluations = <any>{} ;
  p:number=1;
  size: number = 3;
  evaluationForm: FormGroup;
  comments = {} as Comments[];
  constructor(private evaluationService: EvaluationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.evaluationForm = this.fb.group({});
    this.getEvaluation(1);
  }

  getEvaluation(page: number){
    this.evaluationService.getEvaluation(this.productId,page,this.size).subscribe((data:Evaluations) => {
      this.data = data;
      this.p = page;
      this.data.evaluations.forEach(element => {
        this.evaluationForm.addControl(String(element.evaluationId), new FormControl('',[Validators.required, Validators.maxLength(1500)]));
        element.newcomments = [] as any;
      });
    })
  }
  send(evaluation: Evaluation){
    console.log(this.evaluationForm.get(String(evaluation.evaluationId)));
    if(this.evaluationForm.get(String(evaluation.evaluationId)).invalid){
      
      return;
    }
    let content = this.evaluationForm.get(String(evaluation.evaluationId)).value;
    this.evaluationService.postComment(this.userId,evaluation.evaluationId,content).subscribe((data:Comments) => {
      let index = this.data.evaluations.findIndex(x => x.evaluationId === evaluation.evaluationId);
      this.data.evaluations[index].newcomments.push(data);
      this.evaluationForm.get(String(evaluation.evaluationId)).setValue('');
    })
  }
  empty(evaluation){
    this.evaluationForm.get(String(evaluation.evaluationId)).setValue('');
  }
}
