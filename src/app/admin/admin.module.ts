import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AgGridModule } from 'ag-grid-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask'
import { SharedModule } from '../shared/shared.module'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersImportComponent } from './orders-import/orders-import.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { NewOrderComponent } from './orders-import/new-order/new-order.component';
import { ListOrdersImportComponent } from './orders-import/list-orders-import/list-orders-import.component';
import { NgbModalNewProductComponent } from './orders-import/ngb-modal-new-product/ngb-modal-new-product.component';
import { NgbModalNewCategoryComponent } from './orders-import/ngb-modal-new-category/ngb-modal-new-category.component';
import { NgbModalNewSupplierComponent } from './orders-import/ngb-modal-new-supplier/ngb-modal-new-supplier.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MaterialModule } from '../material-module';
import { NgbModalDetailOrderComponent } from './orders/ngb-modal-detail-order/ngb-modal-detail-order.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NgbModalNewSlideComponent } from './slideshow/ngb-modal-new-slide/ngb-modal-new-slide.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FileUploadModule,
    NgbModule,
    NgxMaskModule,
    DropdownModule,
    SharedModule,
    Ng2GoogleChartsModule,
    MaterialModule,
    CheckboxModule,
    NgxPaginationModule,
    SweetAlert2Module,
    RadioButtonModule
  ],
  declarations: [
    AdminComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    OrdersImportComponent,
    StatisticsComponent,
    NewProductComponent,
    ListProductComponent,
    NewOrderComponent,
    ListOrdersImportComponent,
    NgbModalNewProductComponent,
    NgbModalNewCategoryComponent,
    NgbModalNewSupplierComponent,
    NgbModalDetailOrderComponent,
    SlideshowComponent,
    NgbModalNewSlideComponent,
  ],
  entryComponents: [
    NgbModalNewProductComponent,
    NgbModalNewCategoryComponent,
    NgbModalNewSupplierComponent,
    NgbModalDetailOrderComponent,
    NgbModalNewSlideComponent
  ]
})
export class AdminModule { }
