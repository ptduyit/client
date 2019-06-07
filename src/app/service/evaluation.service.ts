import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Evaluations, Comments} from '../model/evaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }
  getEvaluation(productId: number, paging: number, size: number){
    return this.http.get<Evaluations>('https://localhost:44354/api/evaluations/?productid='+productId+'&pagenumber='+paging+'&size='+size);
  }
  postComment(userId:string, parentId: number, content: string): Observable<Comments>{
    var comments = {userId: userId, parentId: parentId, content: content};
    return this.http.post<Comments>('https://localhost:44354/api/comments',comments);
  }
}
