import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressUser, ShowAddressUser } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAllAddress(userId: string){
    return this.http.get<ShowAddressUser[]>('https://localhost:44354/api/Addresses/GetAddressByUserId/'+userId);
  }
  getOneAddress(id: number){
    return this.http.get<AddressUser>('https://localhost:44354/api/Addresses/GetAddressById/'+id);
  }
  updateAddress(address: AddressUser){
    return this.http.put('https://localhost:44354/api/Addresses/PutAddress/'+address.addressId,address);
  }
  addAddress(address: AddressUser){
    return this.http.post<AddressUser>('https://localhost:44354/api/Addresses/PostAddress',address);
  }
  deleteAddress(id: number){
    return this.http.delete('https://localhost:44354/api/Addresses/DeleteAddress/'+id);
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
