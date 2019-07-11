import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataShareService } from '../service/datashare.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token = localStorage.getItem('token');
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private router: Router, private dataShareService: DataShareService,
    private toastr: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // request = request.clone({
    //   setHeaders: { 'Content-Type': 'application/json' }
    // });
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.logout();
            return EMPTY;
          }
          else if(err.status === 403){
            this.toastr.error("","Bạn không có quyền hạn này");
            return EMPTY;
          }
          else{
            return throwError(err.message);
          }
        }));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.dataShareService.updateStatus(null);
    this.dataShareService.updateNumberProduct(0);
    this.token = null;
    this.user = null;
    this.router.navigate(['login']);
  }

}