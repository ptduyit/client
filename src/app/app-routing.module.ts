import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './guard/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CustomPreloadingStrategy } from './service/custom-preloading-strategy.service';

const routes: Routes = [
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
      }
    ]
  }
  
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy : CustomPreloadingStrategy,
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled'
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }