import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { EvaluationComponent } from './products/evaluation/evaluation.component';
import { Router, Routes } from '@angular/router';
import { Err404Component } from '../err404/err404.component';
import { SafeHtmlPipe } from './safe-html-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../shared/category.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    NgxPaginationModule
  ],
  declarations: [
    ProductsComponent,
    CategoryComponent,
    ProductShowcaseComponent,
    EvaluationComponent,
    SafeHtmlPipe
  ],
  providers: [
    CategoryService
  ],
  exports: [
    ProductShowcaseComponent,
    CategoryComponent
  ],
  entryComponents: [CategoryComponent]
})
export class ProductsModule{ }
