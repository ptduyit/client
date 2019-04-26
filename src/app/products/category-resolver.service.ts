import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { CategoryService } from '../shared/category.service';
import { mergeMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {

  constructor(private categoryService: CategoryService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<any>{
    let url = route.paramMap.get('url');
    return this.categoryService.getProductCategoryByUrl(url)
    .pipe(
      catchError(error => {
        const message = `Error error: ${error}`;
          console.error(message);
          return of({ category: null, error: message });
      })
    );
  }
}
