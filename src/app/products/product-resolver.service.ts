import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError, map, filter, take } from 'rxjs/operators';
import { response } from '../model/response';
import { Location } from '@angular/common';
import { ProductService } from '../service/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router, private location: Location) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<any> {
        let id = Number(route.paramMap.get('id'));
        if (isNaN(id)) {
            this.router.navigate(['404']);
            return EMPTY;
        }
        else {
            return this.productService.getProductInformation(id)
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
}
