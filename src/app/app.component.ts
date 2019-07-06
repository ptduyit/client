import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, Route } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { LoadedRouterConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router){
    // this.router.events.pipe(filter(e => e instanceof RoutesRecognized),pairwise())
    //   .subscribe((event: any[]) => {
 
    //     localStorage.setItem('prevRoute', event[0].urlAfterRedirects);
    //   });
  }
  ngOnInit(){
  }
}
