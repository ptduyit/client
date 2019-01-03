import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataShareService{
    private isUserLoggedIn = new BehaviorSubject<any>('');
    private productNumber = new BehaviorSubject<number>(0);
    cast = this.isUserLoggedIn.asObservable();
    num = this.productNumber.asObservable();
    constructor(){}
    updateStatus(newLoggedIn){
        this.isUserLoggedIn.next(newLoggedIn);
    }
    updateNumberProduct(num){
        this.productNumber.next(num);
    }
}