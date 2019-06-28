import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { response } from 'src/app/model/response';
import { Paging } from 'src/app/model/paging';
import { Subscription, Subject, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  role = "all";
  keyword ="";
  page = 1;
  users : User[] = [];
  paging = {} as Paging;
  term$ = new Subject<string>();
  private searchSubscription: Subscription;
  constructor(private title: Title, private userService: UserService) {
    this.title.setTitle('Quản lý người dùng');
   }

  ngOnInit() {
    this.getUser(1);
    this.searchSubscription = this.term$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.getUser(1);
        return EMPTY;
      })).subscribe();
  }
  getUser(page:number){
    this.userService.getUser(page,this.keyword,this.role).subscribe((data:response)=>{
      if(!data.isError){
        this.users = data.module.userManages;
        this.paging = data.module.paging;
      }
    })
  }
  changePage(page:number){
    this.page = page;
    this.getUser(page);
  }
  updateRole(id:string,event){
    this.userService.updateRole(id,event.target.value).subscribe((data:response)=>{
      if(!data.isError){
        this.getUser(this.page);
      }
    })
  }
  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }
  }
}
