import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  readonly rootUrl = 'https://localhost:44354/api/Addresses';
  constructor(private http: HttpClient) { }
  getAllAddress(userId: string){
    return this.http.get<Address[]>(this.rootUrl+'/GetAddressByUserId/'+userId);
  }
  getOneAddress(id: number){
    return this.http.get<Address>(this.rootUrl+'/GetAddressById/'+id);
  }
  updateAddress(address: Address){
    return this.http.put(this.rootUrl+'/PutAddress/'+address.addressId,address);
  }
  addAddress(address: Address){
    return this.http.post<Address>(this.rootUrl+'/PostAddress',address);
  }
  deleteAddress(id: number){
    return this.http.delete(this.rootUrl+'/DeleteAddress/'+id);
  }
}
