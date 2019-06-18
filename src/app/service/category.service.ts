import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getProductCategoryByUrl(url: string, page:number,order:string): Observable<any>{
    return this.http.get(globals.server+'api/category/'+url+'?page='+page+'&order='+order);
  }
  getCategorySelectAll(){
    return this.http.get(globals.server+'api/admin/category/select-full');
  }
  checkUrl(url: string){
    return this.http.get(globals.server+'api/admin/category/check-url/'+url)
  }
  addCategory(category:any){
    return this.http.post(globals.server+'api/admin/category',category)
  }
  getCategorySelectProduct(){
    return this.http.get(globals.server+'api/admin/category/select-product');
  }
  getMenuCategory(){
    return this.http.get(globals.server+'api/menu/category');
  }
}
