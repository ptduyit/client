import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NgbModalNewCategoryComponent } from '../ngb-modal-new-category/ngb-modal-new-category.component';
import { CategoryService } from 'src/app/service/category.service';
import { response } from 'src/app/model/response';
@Component({
  selector: 'app-ngb-modal-new-product',
  templateUrl: './ngb-modal-new-product.component.html',
  styleUrls: ['./ngb-modal-new-product.component.css']
})
export class NgbModalNewProductComponent implements OnInit {
  @Output() returnProduct: EventEmitter<any> = new EventEmitter();
  productForm: FormGroup;
  submitted = false;
  categorySelect: any = [];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private modalService: NgbModal,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['',[Validators.required]],
      categoryId: null,
      quantity: ['', [Validators.required]],
      unitPrice: ['',[Validators.required]],
      category: ['', [Validators.required, AddressValidator]]
    });
    this.categoryService.getCategorySelectProduct().subscribe((rs:response) => {
      if(!rs.isError)
      this.categorySelect = rs.module;
      else
      console.log(rs.message);
    })
    this.productForm.get('category').setValue(0);
  }
  get f() { return this.productForm.controls; }
  save(){
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.returnProduct.emit(this.productForm.value);
  }
  changeSelected(event){
    const id = event.target.value;
    this.productForm.get('categoryId').setValue(id);
  }
  open() {
    const modalRef = this.modalService.open(NgbModalNewCategoryComponent);
    modalRef.componentInstance.returnCategory.subscribe(rs => {
      this.categoryService.getCategorySelectProduct().subscribe((data:response) => {
        if(!data.isError){
          this.categorySelect = data;
          this.productForm.get('categoryId').setValue(rs.id);
          this.productForm.get('category').setValue(rs.id);
        }else
        console.log(data.message);
      });
    });
  }
}
export function AddressValidator(control: AbstractControl): {[key: string]: boolean } | null {
  if(control.value === 0) {
    return {"address": true}
  }
  return null;
}