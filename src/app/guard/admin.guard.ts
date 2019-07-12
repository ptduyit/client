import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, 
  Router, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }
  checkLogin(url:string): boolean {
      let user = JSON.parse(localStorage.getItem('user'));
    if (user && (user.role ==='admin' || user.role === 'employee')){
         return true; 
    }
    else if(user){
        this.toastr.error("","Bạn không có quyền truy cập");
        this.router.navigate(['/']);
        return false;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
