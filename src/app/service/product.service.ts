import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, from, Observable, of } from 'rxjs';
import { Product, ProductSearch } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<Product[]>('https://localhost:44354/api/Products/GetAllProducts');
  }
  getProductById(id: number){
    return this.http.get<Product>('https://localhost:44354/api/Products/GetProductById/' + id);
  }
  getProductInformation(id: number){
    return this.http.get<Product>('https://localhost:44354/api/Products/GetProductInformation/' + id);
  }
  getStockProduct(id: number){
    return this.http.get('https://localhost:44354/api/Products/GetStockProduct/'+id);
  }
  getProductIndex(){
    return this.http.get<Product[]>('https://localhost:44354/api/Products/GetIndexProducts');
  }
  deleteProduct(id : number){
    return this.http.delete<Product[]>('https://localhost:44354/api/Products/DeleteProducts/'+ id);
  }
  createProduct(product: Product){
    return this.http.post<Product>('https://localhost:44354/api/Products/PostProducts', product);
  }
  updateProduct(product: Product){
    return this.http.put('https://localhost:44354/api/Products/PutProducts/'+product.productId,product);
  }
  quicksearchProduct(keyword: string): Observable<ProductSearch[]>
  {
    if(!keyword.trim()){
      return of([]);
    }
    return this.http.get<ProductSearch[]>('https://localhost:44354/api/admin/products/search/'+keyword);
  }


}
