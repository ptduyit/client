import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Evaluation } from '../model/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }
  getEvaluation(productId: number, paging: number, size: number){
    return this.http.get<Evaluation[]>('api/Replies/'+productId+'/'+paging+'/'+size);
  }
}
