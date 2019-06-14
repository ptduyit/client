import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressUser, ShowAddressUser } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAllAddress(userId: string){
    return this.http.get('https://localhost:44354/api/address/user/'+userId);
  }
  getAddressDefault(userId: string){
    return this.http.get('https://localhost:44354/api/address/default/'+userId);
  }
  getOneAddress(id: number){
    return this.http.get('https://localhost:44354/api/address/'+id);
  }
  updateAddress(address: AddressUser){
    return this.http.put('https://localhost:44354/api/address/'+address.addressId,address);
  }
  addAddress(address: AddressUser){
    return this.http.post('https://localhost:44354/api/address',address);
  }
  deleteAddress(id: number){
    return this.http.delete('https://localhost:44354/api/address/'+id);
  }
  getProvinces(){
    return this.http.get('https://localhost:44354/api/LocationTree');
  }
  getDistricts(id: number){
    return this.http.get('https://localhost:44354/api/LocationTree/'+id+'/district');
  }
  getWards(id: number){
    return this.http.get('https://localhost:44354/api/LocationTree/district/'+id+'/ward');
  }
}
