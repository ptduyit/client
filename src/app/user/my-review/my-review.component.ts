import { Component, OnInit } from '@angular/core';
import { Paging } from 'src/app/model/paging';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from 'src/app/service/evaluation.service';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.css']
})
export class MyReviewComponent implements OnInit {

  userId = localStorage.getItem('userId');
  paging ={} as Paging;
  option:number;
  currentPage = 1;
  queryParamSubscription: Subscription;
  constructor(private evaluationService: EvaluationService, private title: Title, private route: ActivatedRoute) {
    this.title.setTitle('Nhận xét của tôi');
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      let option = Number(params.get('option'));
      if(isNaN(option) || option != 1){
        this.option = 0;
      }
      else{
        this.option = 1;
      }
      console.log(this.option);
    });
  }

}
