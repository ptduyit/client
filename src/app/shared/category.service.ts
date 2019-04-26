import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getProductCategoryByUrl(url: string): Observable<any>{
    return this.http.get('api/ProductCategories/GetProductCategoriesByUrl/'+url+'/1');
  }
}
