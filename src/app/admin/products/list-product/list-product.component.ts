import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { ButtonRendererComponent } from './../../../renderer/button-renderer.component';
import { AutoWidthCalculator } from 'ag-grid-community';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[];
  frameworkComponents: any;
  rowDataClicked1 = {};
  rowData: any;
 
  constructor(private proService: ProductService, private router: Router, private title: Title) {
    this.title.setTitle('Quản lý sản phẩm')
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.proService.getProducts()
      .subscribe((data) => {
        this.rowData = data;
      });
  }
  deletePro(productId) {
    var ans = confirm("bạn có thật sự muốn xóa?");
    if (ans) {
      this.proService.deleteProduct(productId)
        .subscribe(data => {
          this.getProduct();
        });
    }

  }
  onBtnClickDelete(e) {
    this.rowDataClicked1 = e.rowData;
    this.deletePro(e.rowData.productId)
  }
  onBtnClickUpdate(e){
    this.router.navigate(['/admin/products/edit/'+ e.rowData.productId])
  }
  onBtnClickView(e){
    this.router.navigate(['view/'+ e.rowData.productId])
  }
  currencyFormatter(params) {
    var vndFormate = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return vndFormate.format(params.value);
  }

  columnDefs = [
    { headerName: 'Sản phẩm', field: 'productName' },
    { headerName: 'Giá bán', field: 'unitPrice', cellRenderer: this.currencyFormatter },
    { headerName: 'Số lượng', field: 'stock' , width: 100},
    { headerName: 'Giá nhập', field: 'importPrice', cellRenderer: this.currencyFormatter},
    { headerName: 'Khuyến mãi (%)', field: 'discount' , width: 120},
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      width: 70,
      cellRendererParams: {
        onClick: this.onBtnClickUpdate.bind(this),
        label: 'Sửa'
      }
    },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      width: 70,
      cellRendererParams: {
        onClick: this.onBtnClickDelete.bind(this),
        label: 'Xóa'
      }
    },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      width: 70,
      cellRendererParams: {
        onClick: this.onBtnClickView.bind(this),
        label: 'Xem'
      }
    }
  ];


}
