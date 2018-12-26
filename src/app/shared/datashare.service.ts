import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataShareService{
    private isUserLoggedIn = new BehaviorSubject<any>('');
    cast = this.isUserLoggedIn.asObservable();
    constructor(){}
    updateStatus(newLoggedIn){
        this.isUserLoggedIn.next(newLoggedIn);
    }
}