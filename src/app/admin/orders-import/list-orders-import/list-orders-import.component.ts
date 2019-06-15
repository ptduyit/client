import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-orders-import',
  templateUrl: './list-orders-import.component.html',
  styleUrls: ['./list-orders-import.component.css']
})
export class ListOrdersImportComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Quản lý đơn nhập hàng');
   }

  ngOnInit() {
  }

}
