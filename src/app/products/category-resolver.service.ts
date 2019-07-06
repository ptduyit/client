import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { mergeMap, catchError, map, filter, take } from 'rxjs/operators';
import { response } from '../model/response';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {

  constructor(private categoryService: CategoryService, private router: Router, private location: Location) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> {
    let url = route.paramMap.get('url');
    return this.categoryService.getProductCategoryByUrl(url, 1, '')
      .pipe(
        mergeMap((data: response) => {
          if (!data.isError) {
            return of(data);
          }
          else {
            this.router.navigate(['404']);
            this.router.events
              .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
              )
              .subscribe(() => this.location.replaceState(state.url));
            return EMPTY;
          }
        }),
        catchError(error => {
          const message = `lỗi: ${error}`;
          console.error(message);
          //return of({ category: null, error: message });
          //this.router.navigate(['404']);
          return EMPTY;
        })
      );
  }
}
