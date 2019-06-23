import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Evaluations, Comments} from '../model/evaluation';
import { Observable } from 'rxjs';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }
  getEvaluation(productId: number, paging: number, size: number){
    return this.http.get(globals.server+'api/evaluations/?productid='+productId+'&pagenumber='+paging+'&size='+size);
  }
  postComment(userId:string, parentId: number, content: string){
    var comments = {userId: userId, parentId: parentId, content: content};
    return this.http.post(globals.server+'api/comments',comments);
  }
  getNoteReview(userId: string, page:number){
    return this.http.get(globals.server+'api/not-review/'+userId+'?page='+page);
  }
  getReviewHistotry(userId:string,page:number){
    return this.http.get(globals.server+'api/review-history/'+userId+'?page='+page);
  }
  postPutReview(evaluation: any){
    return this.http.post(globals.server+'api/review/add',evaluation);
  }
}
