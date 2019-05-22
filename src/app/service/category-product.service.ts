import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(private http: HttpClient) { }
  getCategory(){
    return this.http.get('https://localhost:44354/api/ProductCategories');
  }
}
