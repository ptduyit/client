import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, from, Observable, of } from 'rxjs';
import { Product, ProductSearch, QuickAddProduct } from '../model/product';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<Product[]>(globals.server+'api/Products/GetAllProducts');
  }
  
  getStockProduct(id: number){
    return this.http.get(globals.server+'api/Products/GetStockProduct/'+id);
  }
  getProductIndex(){
    return this.http.get<Product[]>(globals.server+'api/Products/GetIndexProducts');
  }
  deleteProduct(id : number){
    return this.http.delete<Product[]>(globals.server+'api/Products/DeleteProducts/'+ id);
  }
  createProduct(product: Product){
    return this.http.post<Product>(globals.server+'api/Products/PostProducts', product);
  }
  
  quicksearchProduct(keyword: string): Observable<ProductSearch[]>
  {
    if(!keyword.trim()){
      return of([]);
    }
    return this.http.get<ProductSearch[]>(globals.server+'api/admin/products/search/'+keyword);
  }
  addQuickProductOrderImport(data: QuickAddProduct){
    return this.http.post(globals.server+'api/admin/products/quick-add',data);
  }
  getProductById(id: number){
    return this.http.get(globals.server+'api/admin/products/'+ id);
  }
  updateProduct(id: number,formData: FormData){
    return this.http.put(globals.server+'api/admin/products/'+id,formData);
  }
  getProductInformation(id: number){
    return this.http.get(globals.server+'api/products/' + id);
  }
  getProductManage(page:number,size:number,status:string,keyword:string,categoryid:number){
    return this.http.get(globals.server+'api/admin/products?page='+page+'&size='+size+'&status='+status+'&keyword='+keyword+'&categoryid='+categoryid);
  }
  updateStatus(id:number,status:string){
    return this.http.get(globals.server+'api/admin/change-status/'+id+'/'+status);
  }
  getProductShowIndex(){
    return this.http.get(globals.server+'api/products/products-show');
  }
  quickSearch(keyword:string){
    return this.http.get(globals.server+'api/products/quick-search?keyword='+keyword);
  }
}
