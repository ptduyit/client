import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getProductCategoryByUrl(url: string, page): Observable<any>{
    return this.http.get('https://localhost:44354/api/ProductCategories/GetProductCategoriesByUrl/'+url+'/'+page);
  }
  getCategorySelectAll(){
    return this.http.get('https://localhost:44354/api/admin/category/select-full');
  }
  checkUrl(url: string){
    return this.http.get('https://localhost:44354/api/admin/category/check-url/'+url)
  }
  addCategory(category:any){
    return this.http.post('https://localhost:44354/api/admin/category',category)
  }
  getCategorySelectProduct(){
    return this.http.get('https://localhost:44354/api/admin/category/select-product');
  }
}
