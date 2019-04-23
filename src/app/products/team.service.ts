import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TeamService {

  private teams:any = [
    {
      "id": 1,
      "name": "david",
      "description": "I like working on angular 2"
    },
    {
      "id": 2,
      "name": "brad",
      "description": "I like working on java"
    },
    {
      "id": 3,
      "name": "rob",
      "description": "I'm a QA guru"
    },
    {
      "id": 4,
      "name": "test",
      "description": "I'm a TEST"
    }
  ];

  constructor() {
  }

  getTeams(): Observable<any> {
    /*return this._http.get('team.json')
      .map(this._extractData)
      .catch(this._handleError);*/
    return of(this.teams);
  }

  getTeam(name: string): Observable<any> {
    let team;
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == name) {
        team = this.teams[i];
      }
    }
    return of(team);
  }

  private _extractData(res: Response): any {
      /*const body: any = res.json();
      return body;*/
      return res;
  }

  private _handleError(error: any): any {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
