import { Component, OnInit, Input } from '@angular/core';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { Evaluations, Comments, Evaluation } from 'src/app/model/evaluation';
import { Paging } from 'src/app/model/paging';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  @Input() productId: number;
  user = JSON.parse(localStorage.getItem('user'));
  data:Evaluations = <any>{} ;
  size: number = 3;
  evaluationForm: FormGroup;
  comments : Comments[] = [];
  constructor(private evaluationService: EvaluationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.evaluationForm = this.fb.group({});
    this.getEvaluation(1);
  }

  getEvaluation(page: number){
    this.evaluationService.getEvaluation(this.productId,page,this.size).subscribe((data:response) => {
      this.data = data.module;
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
    this.evaluationService.postComment(this.user.id,evaluation.evaluationId,content).subscribe((data:response) => {
      let index = this.data.evaluations.findIndex(x => x.evaluationId === evaluation.evaluationId);
      this.data.evaluations[index].newcomments.push(data.module);
      this.evaluationForm.get(String(evaluation.evaluationId)).setValue('');
    })
  }
  empty(evaluation){
    this.evaluationForm.get(String(evaluation.evaluationId)).setValue('');
  }
}
