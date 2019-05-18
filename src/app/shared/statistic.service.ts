import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { StatisticOfMonth } from '../model/statisticmonth';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private readonly url='https://localhost:44354/api/statistic/'
  constructor( private http :HttpClient ) { }

  getSatisticOfYearColum(year:number):Observable<StatisticOfMonth[]>{
    return this.http.get<StatisticOfMonth[]>(this.url+'getStatistic/'+year);
  }
  getYears():Observable<number[]>{
    return this.http.get<number[]>(this.url+"getYear");
  }
  getExportOfyear(year):Observable<number[]>{
    return this.http.get<number[]>(this.url+"/getExportsOfYear/"+year);
  }
}
