import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    ProductShowcaseComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductShowcaseComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
