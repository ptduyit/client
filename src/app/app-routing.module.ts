import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
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
