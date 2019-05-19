import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { StatisticOfMonth } from '../model/statisticmonth';
import { CategoryOfMonth } from '../model/categoryofmonth';

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
  getCateogyByMonth(month,year):Observable<CategoryOfMonth[]>{
    return this.http.get<CategoryOfMonth[]>(this.url+"getCretogyExportMonth?month="+month+"&year="+year)
  }
  getStatisticOfYear(year):Observable<number[]>{
    return this.http.get<number[]>(this.url+"getStatisticOfyear/"+year);
  }
  getStatisticOnMonthOfYear(year,month):Observable<number[]>{
    console.log(this.url+"getStatisticOnMonthOfYear?year="+year+"&month="+month);
    return this.http.get<number[]>(this.url+"getStatisticOnMonthOfYear?year="+year+"&month="+month);
 
  }
}
