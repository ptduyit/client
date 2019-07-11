import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { EvaluationComponent } from './products/evaluation/evaluation.component';
import { SafeHtmlPipe } from './safe-html-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    NgxPaginationModule,
    SharedModule,
    SlickCarouselModule,
    NgxImageZoomModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductsComponent,
    CategoryComponent,
    EvaluationComponent,
    SafeHtmlPipe,
    SearchComponent
  ]
})
export class ProductsModule{ }
