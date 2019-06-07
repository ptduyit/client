import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoundPipe } from './pipe/round.pipe';

@NgModule({
  declarations: [
    ProductShowcaseComponent,
    PageNotFoundComponent,
    RoundPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductShowcaseComponent,
    PageNotFoundComponent,
    RoundPipe
  ]
})
export class SharedModule { }
