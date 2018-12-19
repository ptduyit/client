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
    return this.http.get<Product[]>(this.rootUrl);
  }
  getProductById(id: number){
    return this.http.get<Product>(this.rootUrl + '/' + id);
  }
  deleteProduct(id : number){
    return this.http.delete<Product[]>(this.rootUrl +'/'+ id);
  }
  createProduct(product: Product){
    return this.http.post(this.rootUrl, product);
  }
  updateProduct(product: Product){
    return this.http.put(this.rootUrl+'/'+product.productId,product);
  }

}
