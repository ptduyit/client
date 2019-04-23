import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { EvaluationComponent } from './products/evaluation/evaluation.component';
import { TeamService } from './team.service';
import { Router, Routes } from '@angular/router';
import { Err404Component } from '../err404/err404.component';
import { SafeHtmlPipe } from './safe-html-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

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
    TeamService
  ],
  exports: [
    ProductShowcaseComponent,
    CategoryComponent
  ],
  entryComponents: [CategoryComponent]
})
export class ProductsModule { 
  constructor( private service: TeamService, private router: Router){
    this.service.getTeams().subscribe(
      (result: any) => {
        let r:Routes = this.router.config;
        r.splice(r.length-1,1);
        for(let j = 0; j < result.length; j++) {
          r.push({path:result[j].name, component: CategoryComponent})
        }
        r.push({ path: '**', component: Err404Component});
      }
    )
  }
}
