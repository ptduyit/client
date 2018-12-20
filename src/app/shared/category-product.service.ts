import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  readonly rootUrl = 'https://localhost:44354/api/ProductCategories';
  constructor(private http: HttpClient) { }
  getCategory(){
    return this.http.get(this.rootUrl);
  }
}
