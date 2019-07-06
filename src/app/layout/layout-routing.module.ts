import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: '../admin/admin.module#AdminModule',
        data: { preload: false}
        // ,        canLoad: [AuthGuard]
      }
    ]
  },
  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'user',
        loadChildren: '../user/user.module#UserModule',
        data:{preload: true, delay: true}
        // ,        canLoad: [AuthGuard]
      },
      { 
        path: 'login',
        loadChildren: '../auth/auth.module#AuthModule',
        data: {preload:true, delay:false}
      },
      { 
        path: 'signup', 
        loadChildren: '../auth/auth.module#AuthModule',
        data: {preload:true, delay:false}
      },
      {
        path: '404',
        component: PageNotFoundComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
