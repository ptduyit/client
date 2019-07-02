import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'src/app/model/response';
@Component({
  selector: 'app-ngb-modal-new-supplier',
  templateUrl: './ngb-modal-new-supplier.component.html',
  styleUrls: ['./ngb-modal-new-supplier.component.css']
})
export class NgbModalNewSupplierComponent implements OnInit {

  @Output() returnSupplier: EventEmitter<any> = new EventEmitter();
  supplierForm: FormGroup;
  submitted = false;
  provinces: any = [];
  districts: any = [];
  wards: any = [];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private toastr: ToastrService,
    private addressService: AddressService, private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierForm = this.fb.group({
      companyName : ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      wardId: null,
      province: ['', [Validators.required, AddressValidator]],
      district: ['', [Validators.required, AddressValidator]],
      ward: ['', [Validators.required, AddressValidator]],
    });

    this.addressService.getProvinces().subscribe((rs:response) => {
      this.provinces = rs.module;
    });
      this.supplierForm.get('district').disable();
      this.supplierForm.get('ward').disable();
      this.supplierForm.controls['province'].setValue(0);
      this.supplierForm.controls['district'].setValue(0);
      this.supplierForm.controls['ward'].setValue(0);
  }
  get f() { return this.supplierForm.controls; }
  changeSelected(event,type){
    const id = event.target.value;
    if(type=="province"){
      this.addressService.getDistricts(id).subscribe((data: response) => {
        this.districts = data.module;
        this.wards = [];
        this.supplierForm.get('district').enable();
        this.supplierForm.get('ward').disable();
        this.supplierForm.controls['district'].setValue(0);
        this.supplierForm.controls['ward'].setValue(0);
      });
    }
    else if(type=="district"){
      this.addressService.getWards(id).subscribe((wa: response) => {
        this.wards = wa.module;
        this.supplierForm.get('ward').enable();
        this.supplierForm.controls['ward'].setValue(0);
      });
    }
    else {
      this.supplierForm.controls['wardId'].setValue(id);
    }
  }
  save(){
    this.submitted = true;
    if (this.supplierForm.invalid) {
      return;
    }
    this.supplierService.createSupplier(this.supplierForm.value).subscribe((rs: response) => {
      if(!rs.isError){
        this.toastr.success("","Đã thêm nhà cung cấp mới");
        this.returnSupplier.emit(rs.module);
        this.activeModal.close();
      }
      else{
        this.toastr.error("","Lỗi khi thêm nhà cung cấp");
      }
    })
  }
}
export function AddressValidator(control: AbstractControl): {[key: string]: boolean } | null {
  if(control.value === 0) {
    return {"address": true}
  }
  return null;
}