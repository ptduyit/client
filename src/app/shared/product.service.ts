import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, from, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<Product[]>('/api/Products/GetAllProducts');
  }
  getProductById(id: number){
    return this.http.get<Product>('/api/Products/GetProductById/' + id);
  }
  getProductInformation(id: number){
    return this.http.get<Product>('/api/Products/GetProductInformation/' + id);
  }
  getStockProduct(id: number){
    return this.http.get('/api/Products/GetStockProduct/'+id);
  }
  getProductIndex(){
    return this.http.get<Product[]>('/api/Products/GetIndexProducts');
  }
  deleteProduct(id : number){
    return this.http.delete<Product[]>('/api/Products/DeleteProducts/'+ id);
  }
  createProduct(product: Product){
    return this.http.post<Product>('/api/Products/PostProducts', product);
  }
  updateProduct(product: Product){
    return this.http.put('/api/Products/PutProducts/'+product.productId,product);
  }


}
