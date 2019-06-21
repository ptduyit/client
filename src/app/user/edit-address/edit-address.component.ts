import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AddressUser } from 'src/app/model/address';
import { NotificationsService } from 'angular2-notifications';
import { response } from 'src/app/model/response';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  id: number;
  address: AddressUser;
  provinces: any = [];
  districts: any = [];
  wards: any = [];
  edit = false;
  flag: string = "Thêm Địa Chỉ Mới";
  addressForm: FormGroup;
  submitted = false;
  userId = localStorage.getItem('userId');
  prevRoute = localStorage.getItem('prevRoute');
  constructor(private router: Router, private addressService: AddressService, private fb: FormBuilder,
    private avRouter: ActivatedRoute, private _service: NotificationsService, private title: Title) {
      this.title.setTitle('Thêm mới địa chỉ');
     }

  ngOnInit() {
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
    }
    this.addressForm = this.fb.group({
      addressId: 0,
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      province: ['', [Validators.required, AddressValidator]],
      district: ['', [Validators.required, AddressValidator]],
      ward: ['', [Validators.required, AddressValidator]],
      street: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      isDefault: false,
      userId: this.userId,
      wardId: null
    });
    if (this.id > 0) {
      this.edit = true;
      this.flag="Chỉnh Sửa Địa Chỉ";
      this.title.setTitle('Chỉnh sửa địa chỉ');
      this.addressService.getOneAddress(this.id)
        .subscribe((data: response) => 
          {
            this.addressForm.patchValue(data.module);
            this.addressForm.controls['province'].setValue(data.module.wards.districts.provinces.provinceId);
            this.provinces.push(data.module.wards.districts.provinces);
            this.addressForm.controls['district'].setValue(data.module.wards.districts.districtId);
            this.districts.push(data.module.wards.districts);
            this.addressForm.controls['ward'].setValue(data.module.wards.wardId);
            this.wards.push(data.module.wards);
            this.addressForm.controls['wardId'].setValue(data.module.wardId);
            this.addressService.getProvinces().subscribe((pr:response)=> this.provinces = pr.module);
            this.addressService.getDistricts(data.module.wards.districts.provinces.provinceId).subscribe((dis:response) => this.districts = dis.module);
            this.addressService.getWards(data.module.wards.districts.districtId).subscribe((wa:response) => this.wards = wa.module);
          });
    } else {
      this.addressService.getProvinces().subscribe((ob:response) => this.provinces = ob.module);
      this.addressForm.get('district').disable();
      this.addressForm.get('ward').disable();
      this.addressForm.controls['province'].setValue(0);
      this.addressForm.controls['district'].setValue(0);
      this.addressForm.controls['ward'].setValue(0);
    }

  }
  changeSelected(event,type){
    const id = event.target.value;
    if(type=="province"){
      this.addressService.getDistricts(id).subscribe((dis:response) => {
        this.districts = dis.module;
        this.wards = [];
        this.addressForm.get('district').enable();
        this.addressForm.get('ward').disable();
        this.addressForm.controls['district'].setValue(0);
        this.addressForm.controls['ward'].setValue(0);
      });
    }
    else if(type=="district"){
      this.addressService.getWards(id).subscribe((wa:response) => {
        this.wards = wa.module;
        this.addressForm.get('ward').enable();
        this.addressForm.controls['ward'].setValue(0);
      });
    }
    else {
      this.addressForm.controls['wardId'].setValue(id);
    }
  }
  get f() { return this.addressForm.controls; }
  save(){
    this.submitted = true;
    if (this.addressForm.invalid) {
      return;
    }
    if(!this.edit){
      this.addressService.addAddress(this.addressForm.value)
      .subscribe(data => {
        //this.router.navigate(['user/address'])
        this.router.navigate([this.prevRoute]);
        this._service.info('Thêm thành công','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
      });
    }
    else if(this.edit){
      this.addressService.updateAddress(this.addressForm.value)
      .subscribe(data => {
        this.router.navigate(['user/address'])
        this._service.info('Sửa thành công','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
      });
    }
  }
  cancel(){
    this.router.navigate(['user/address']);
  }
}
export function AddressValidator(control: AbstractControl): {[key: string]: boolean } | null {
  if(control.value === 0) {
    return {"address": true}
  }
  return null;
}
