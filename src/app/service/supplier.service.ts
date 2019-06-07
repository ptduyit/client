import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchSupplier, Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  searchSupplier(keyword: string): Observable<SearchSupplier[]>{
    if(!keyword.trim()){
      return of([]);
    }
    return this.http.get<SearchSupplier[]>("https://localhost:44354/api/admin/suppliers/search/"+keyword);
  }
  createSupplier(supplier: Supplier){
    return this.http.post<SearchSupplier>("https://localhost:44354/api/admin/suppliers",supplier);
  }
}
