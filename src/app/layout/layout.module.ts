import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardLayoutComponent,
    FooterComponent,
    HeaderComponent,
    HeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [
    MainLayoutComponent,
    DashboardLayoutComponent
  ]
})
export class LayoutModule { }
