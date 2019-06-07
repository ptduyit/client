import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { SearchSupplier } from 'src/app/model/supplier';
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
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
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

    this.addressService.getProvinces().subscribe(ob => this.provinces = ob);
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
      this.addressService.getDistricts(id).subscribe(dis => {
        this.districts = dis;
        this.wards = [];
        this.supplierForm.get('district').enable();
        this.supplierForm.get('ward').disable();
        this.supplierForm.controls['district'].setValue(0);
        this.supplierForm.controls['ward'].setValue(0);
      });
    }
    else if(type=="district"){
      this.addressService.getWards(id).subscribe(wa => {
        this.wards = wa;
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
    this.supplierService.createSupplier(this.supplierForm.value).subscribe((rs: SearchSupplier) => {
      this.returnSupplier.emit(rs);
      this.activeModal.close();
    })
  }
}
export function AddressValidator(control: AbstractControl): {[key: string]: boolean } | null {
  if(control.value === 0) {
    return {"address": true}
  }
  return null;
}