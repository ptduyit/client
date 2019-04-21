import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from 'src/app/renderer/button-renderer.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersImportComponent } from './orders-import/orders-import.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
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
    ButtonRendererComponent,
  ]
})
export class AdminModule { }
