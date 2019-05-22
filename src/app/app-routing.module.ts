import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: 'cart',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: CartComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { 
    path: '', pathMatch: 'full',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
