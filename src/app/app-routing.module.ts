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
        canActivate: [AuthGuard]
      }
    ]
  },
  // { 
  //   path: 'cart',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: CartComponent,
  //       canActivate: [AuthGuard]
  //     }
  //   ]
  // },
  
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
