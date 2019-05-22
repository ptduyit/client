import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbModalNewCategoryComponent } from '../ngb-modal-new-category/ngb-modal-new-category.component';
@Component({
  selector: 'app-ngb-modal-new-product',
  templateUrl: './ngb-modal-new-product.component.html',
  styleUrls: ['./ngb-modal-new-product.component.css']
})
export class NgbModalNewProductComponent implements OnInit {
  @Input() name;
  productForm: FormGroup;
  submitted = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['',[Validators.required]],
      categoryId: ['',[Validators.required]],
      stock: ['', Validators.required],
      unitPrice: ['', Validators.required],
    });
  }
  get f() { return this.productForm.controls; }
  save(){
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
  }
  open() {
    const modalRef = this.modalService.open(NgbModalNewCategoryComponent);
    modalRef.componentInstance.name = 'World';
  }
}
