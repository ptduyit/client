import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressUser, ShowAddressUser } from '../model/address';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAllAddress(userId: string){
    return this.http.get(globals.server+'api/address/user/'+userId);
  }
  getAddressDefault(userId: string){
    return this.http.get(globals.server+'api/address/default/'+userId);
  }
  getOneAddress(id: number){
    return this.http.get(globals.server+'api/address/'+id);
  }
  updateAddress(address: AddressUser){
    return this.http.put(globals.server+'api/address/'+address.addressId,address);
  }
  addAddress(address: AddressUser){
    return this.http.post(globals.server+'api/address',address);
  }
  deleteAddress(id: number){
    return this.http.delete(globals.server+'api/address/'+id);
  }
  getProvinces(){
    return this.http.get(globals.server+'api/LocationTree');
  }
  getDistricts(id: number){
    return this.http.get(globals.server+'api/LocationTree/'+id+'/district');
  }
  getWards(id: number){
    return this.http.get(globals.server+'api/LocationTree/district/'+id+'/ward');
  }
}
