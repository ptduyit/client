import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalNewProductComponent } from '../ngb-modal-new-product/ngb-modal-new-product.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductSearch } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderImportService } from 'src/app/service/order-import.service';
import { NgbModalNewSupplierComponent } from '../ngb-modal-new-supplier/ngb-modal-new-supplier.component';
import { SearchSupplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  searchProductControl = new FormControl();
  searchSupplierControl = new FormControl();
  orders: any;
  summed = 0;
  private searchProductTerms = new Subject<string>();
  private searchSupplierTerms = new Subject<string>();
  products$ : Observable<ProductSearch[]>;
  suppliers$: Observable<SearchSupplier[]>;
  userId = localStorage.getItem('userId');
  orderId: number
  constructor(private modalService: NgbModal, private fb: FormBuilder, private ref: ChangeDetectorRef,
     private productService: ProductService, private avRouter: ActivatedRoute, private router: Router,
     private orderimportService: OrderImportService, private supplierService: SupplierService) { }

  ngOnInit() {
    if(this.avRouter.snapshot.params["id"]) {
      this.orderId = this.avRouter.snapshot.params["id"];
    }
    
    this.orderForm = this.fb.group({
      orderId: '',
      supplierId: '',
      userId: '',
      product: this.fb.array([])
    });

    if(this.orderId > 0){
      this.orderimportService.getOrderById(this.orderId).subscribe( (data:any) => {
        this.orderForm.patchValue(data);
        this.orders = data;
        this.setProduct(data.orderDetails);
      });
    }

    this.orderForm.get('product').valueChanges.subscribe(values => {
      this.summed = 0;
      const ctrl = <FormArray>this.orderForm.controls['product'];
      ctrl.controls.forEach(x => {
        var parsed = parseInt(x.get('quantity').value) * parseInt(x.get('unitPrice').value);
        if(isNaN(parsed)) {
          parsed = 0;
        }
        this.summed += parsed;
        this.ref.detectChanges();
      })
    });
    this.searchProductControl.valueChanges.subscribe(value => {
      this.searchProductTerms.next(value);
    });
    this.products$ = this.searchProductTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.quicksearchProduct(term)),
    );
    this.searchSupplierControl.valueChanges.subscribe(value => {
      this.searchSupplierTerms.next(value);
    });
    this.suppliers$ = this.searchSupplierTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.supplierService.searchSupplier(term))
    );

    this.products$.subscribe(res=> console.log(res));
  }
  
  save(){

  }
  addProduct(id: number, name: string){
    if(this.orderId > 0){
      if(!this.isDuplicate(id)){
        this.orderimportService.addOrderDetail(id,this.orderId).subscribe(rs => {
        this.addRow(id,name);
        });
      }
      else console.log('trùng rồi');
    }
    else {
      let supplierId = this.orderForm.get('supplierId').value;
      this.orderimportService.createOrder(this.userId,supplierId,id).subscribe((rs:any) => {
        this.router.navigate(['admin/orders-import/edit/'+ rs.id])
      })
    }
  }
  setSupplier(id: number, name: string){
    this.orderForm.get('supplierId').setValue(id);
    
  }
  addRow(id: number, name: string){
    const ctrl = <FormArray>this.orderForm.controls.product;
    ctrl.push(this.fb.group({ 
      productId: id,
      unitPrice: '',
      productName: name,
      quantity: ''
    }));
  }
  deleteProduct(index,id) {
    this.orderimportService.deleteOrderDetail(this.orderId,id).subscribe(rs => {
      let control = <FormArray>this.orderForm.controls.product;
      control.removeAt(index);
    });
  }
  // addRows(){
  //   const ctrl = <FormArray>this.orderForm.controls.product;
  //   ctrl.push(this.itemRows());
  // }
  // itemRows(){
  //   return this.fb.group({ 
  //     productId: 123,
  //     unitPrice: '',
  //     productName: 'iphone',
  //     quantity: ''
  //   });
  // }
  isDuplicate(id:number): boolean{
    let product = <FormArray>this.orderForm.controls.product;
    if(product.value.findIndex(p => p.productId === id) > -1){
      return true;
    }
    return false;
  }
  setProduct(products: any) {
    let control = <FormArray>this.orderForm.controls.product;
    products.forEach(x => {
      control.push(this.fb.group({ 
        productId: x.productId,
        unitPrice: x.unitPrice,
        productName: x.productName,
        quantity: x.quantity
      }));
    });
  }
  openProduct() {
    const modalRef = this.modalService.open(NgbModalNewProductComponent);
    modalRef.componentInstance.name = 'World';
    this.searchProductControl.setValue('');
  }
  openSupplier(){
    this.modalService.open(NgbModalNewSupplierComponent);
  }
}

