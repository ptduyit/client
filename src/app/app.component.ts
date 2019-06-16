import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  constructor(public router: Router){
    this.router.events.pipe(filter(e => e instanceof RoutesRecognized),pairwise())
      .subscribe((event: any[]) => {
        console.log(event[0].urlAfterRedirects);
        localStorage.setItem('prevRoute', event[0].urlAfterRedirects);
      });
  }

}
