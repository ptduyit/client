import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ngb-modal-new-supplier',
  templateUrl: './ngb-modal-new-supplier.component.html',
  styleUrls: ['./ngb-modal-new-supplier.component.css']
})
export class NgbModalNewSupplierComponent implements OnInit {

  supplierForm: FormGroup;
  submitted = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.supplierForm = this.fb.group({
      companyName : ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      wardId: ['', [Validators.required]]
    })
  }
  get f() { return this.supplierForm.controls; }
  save(){
    this.submitted = true;
    if (this.supplierForm.invalid) {
      return;
    }
  }
}
