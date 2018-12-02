import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BoughtComponent } from './bought/bought.component';
import { SearchComponent } from './search/search.component';
import { ViewMoreComponent } from './view-more/view-more.component';


const routes: Routes = [
  { path: 'view/:id', component: ProductViewComponent },
  { path:'home',component: HomepageComponent},
  { path:'cart',component:CartComponent},
  { path:'user/:id',component:UserInfoComponent},
  { path: 'login',component:LoginComponent},
  { path:'signup',component:SignupComponent},
  { path:'admin',component:AdminPageComponent },
  { path:'bought/:id',component:BoughtComponent},
  { path:'search',component:SearchComponent},
  { path:'view-more',component:ViewMoreComponent},
 





  { path:'',redirectTo: '/home', pathMatch: 'full' },
  //error de cuoi cung
  { path:'**',component:Err404Component},
  
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
