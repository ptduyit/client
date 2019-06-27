import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AuthGuard } from '../guard/auth.guard';
import { NotifycationComponent } from './notifycation/notifycation.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { NotReviewComponent } from './my-review/not-review/not-review.component';
import { ReviewHistoryComponent } from './my-review/review-history/review-history.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'edit-profile'},
          { path: 'profile', component: ProfileComponent},
          { path: 'my-orders', component: MyOrdersComponent},
          { path: 'address', component: AddressComponent},
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'add-address', component: EditAddressComponent },
          { path: 'edit-address/:id', component: EditAddressComponent },
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'order-detail', component: OrderDetailComponent },
          { path: 'notifycation', component: NotifycationComponent},
          { 
            path: 'my-review', component: MyReviewComponent,
            children: [
              { path: 'not-review', component: NotReviewComponent },
              { path: 'review-history', component: ReviewHistoryComponent},
              { path: '', pathMatch: 'full', redirectTo: 'not-review'}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
