import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalNewProductComponent } from '../ngb-modal-new-product/ngb-modal-new-product.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductSearch, QuickAddProduct, QuickAddProductForm } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderImportService } from 'src/app/service/order-import.service';
import { NgbModalNewSupplierComponent } from '../ngb-modal-new-supplier/ngb-modal-new-supplier.component';
import { SearchSupplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';
import { OrderImport } from 'src/app/model/order-import';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  searchProductControl = new FormControl();
  searchSupplierControl = new FormControl();
  orders = {} as OrderImport;
  summed = 0;
  private searchProductTerms = new Subject<string>();
  private searchSupplierTerms = new Subject<string>();
  products$ : Observable<ProductSearch[]>;
  suppliers$: Observable<SearchSupplier[]>;
  userId = localStorage.getItem('userId');
  orderId = 0;
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
      companyName: '',
      product: this.fb.array([])
    });

    if(this.orderId > 0){
      this.orderimportService.getOrderById(this.orderId).subscribe( (data:OrderImport) => {
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
  temp(){
    if(this.orderId > 0){
      this.orderimportService.tempOrder(this.orderId,this.orderForm.value).subscribe(rs => {
        console.log("đã lưu");
      })
    }
    else{
      console.log('ko có gì để lưu');
    }
  }
  save(){
    if(this.orderId > 0){
      this.orderimportService.saveOrder(this.orderId,this.orderForm.value).subscribe(rs => {
        console.log("đã lưu");
      })
    }
    else{
      console.log('ko có gì để lưu');
    }
  }
  addProduct(id: number, name: string){
    if(this.orderId > 0){
      if(!this.isDuplicate(id)){
        this.searchProductControl.setValue('');
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
    this.searchSupplierControl.setValue('');
    this.orderForm.get('supplierId').setValue(id);
    this.orderForm.get('companyName').setValue(name);
    this.orders.supplierId = id;
    this.orders.companyName = name;

  }
  addRow(id: number, name: string){
    const ctrl = <FormArray>this.orderForm.controls.product;
    ctrl.push(this.fb.group({ 
      productId: id,
      unitPrice: 0,
      productName: name,
      quantity: 0
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
    this.searchProductControl.setValue('');
    modalRef.componentInstance.returnProduct.subscribe((rs:QuickAddProductForm) => {
      let supplierId = this.orderForm.get('supplierId').value;
      var data : QuickAddProduct = {
        categoryId : rs.categoryId,
        orderId : this.orderId,
        productName: rs.productName,
        quantity: rs.quantity,
        supplierId: supplierId,
        unitPrice: rs.unitPrice,
        userId: this.userId
      }
      if(this.orderId > 0){
        this.productService.addQuickProductOrderImport(data).subscribe((e:any) => {//orderId,productId
          const ctrl = <FormArray>this.orderForm.controls.product;
          ctrl.push(this.fb.group({ 
            productId: e.productId,
            unitPrice: rs.unitPrice,
            productName: rs.productName,
            quantity: rs.quantity
          }));
          modalRef.close();
        })
      }
      else{
        this.productService.addQuickProductOrderImport(data).subscribe((e:any) => {
          this.router.navigate(['admin/orders-import/edit/'+ e.orderId]);
          modalRef.close();
        });
      }
    })
  }
  openSupplier(){
    const modalRef = this.modalService.open(NgbModalNewSupplierComponent);
    this.searchSupplierControl.setValue('');
    modalRef.componentInstance.returnSupplier.subscribe((rs: SearchSupplier) => {
      this.setSupplier(rs.id,rs.name);
    })
  }
}

