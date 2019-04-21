import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'view/:id', component: ProductViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { 
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  // { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Err404Component },

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
