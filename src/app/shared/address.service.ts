import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAllAddress(userId: string){
    return this.http.get<Address[]>('/api/Addresses/GetAddressByUserId/'+userId);
  }
  getOneAddress(id: number){
    return this.http.get<Address>('/api/Addresses/GetAddressById/'+id);
  }
  updateAddress(address: Address){
    return this.http.put('/api/Addresses/PutAddress/'+address.addressId,address);
  }
  addAddress(address: Address){
    return this.http.post<Address>('/api/Addresses/PostAddress',address);
  }
  deleteAddress(id: number){
    return this.http.delete('/api/Addresses/DeleteAddress/'+id);
  }
}
