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
    this.router.events.pipe(filter(e => e instanceof RoutesRecognized),pairwise())
      .subscribe((event: any[]) => {
        console.log(event[0].urlAfterRedirects);
        localStorage.setItem('prevRoute', event[0].urlAfterRedirects);
      });
  }
  ngOnInit(){
    
  
    //this.printpath('', this.router.config);
    this.printPaths('', this.router.config);
  }
  printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
  printPaths(parent: string, routes: Route[]) {
    const getFullPath = (path?: string) => {
        if (path) {
            return parent + '/' + path;
        }

        return parent;
    };

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const fullPath = getFullPath(route.path);

        console.log(parent + '/' + route.path, route.component);

        if (route.children /*&& route.children.length > 0*/) {
            this.printPaths(fullPath, route.children);
        }

        if (route.loadChildren && route.loadChildren.length > 0) {
            var routerConfig = <LoadedRouterConfig>(<any>route)['_loadedConfig'];
            if (routerConfig) {
                this.printPaths(fullPath, routerConfig.routes);
            }
        }
    }
}

}
