import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Thống kê doanh số bán hàng');
   }

  ngOnInit() {
  }

}
