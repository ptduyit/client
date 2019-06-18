import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchSupplier, Supplier } from '../model/supplier';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  searchSupplier(keyword: string): Observable<SearchSupplier[]>{
    if(!keyword.trim()){
      return of([]);
    }
    return this.http.get<SearchSupplier[]>(globals.server+'api/admin/suppliers/search/'+keyword);
  }
  createSupplier(supplier: Supplier){
    return this.http.post(globals.server+'api/admin/suppliers',supplier);
  }
}
