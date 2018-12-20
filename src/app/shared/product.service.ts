import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  readonly rootUrl = 'https://localhost:44354/api/Products';
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<Product[]>(this.rootUrl+'/GetAllProducts');
  }
  getProductById(id: number){
    return this.http.get<Product>(this.rootUrl + '/GetProductById/' + id);
  }
  getProductIndex(){
    return this.http.get<Product[]>(this.rootUrl+'/GetIndexProducts');
  }
  deleteProduct(id : number){
    return this.http.delete<Product[]>(this.rootUrl +'/DeleteProducts/'+ id);
  }
  createProduct(product: Product){
    return this.http.post(this.rootUrl+'/PostProducts', product);
  }
  updateProduct(product: Product){
    return this.http.put(this.rootUrl+'/PutProducts/'+product.productId,product);
  }


}
