import { Component, OnInit } from '@angular/core';
import { ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
   ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { StatisticService } from 'src/app/shared/statistic.service';
import { StatisticOfMonth } from 'src/app/model/statisticmonth';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  months: any[] = [
    {value: '1', name: 'Tháng 1'},
    {value: '2', name: 'Tháng 2'},
    {value: '3', name: 'Tháng 3'},
    {value: '4', name: 'Tháng 4'},
    {value: '5', name: 'Tháng 5'},
    {value: '6', name: 'Tháng 6'},
    {value: '7', name: 'Tháng 7'},
    {value: '8', name: 'Tháng 8'},
    {value: '9', name: 'Tháng 9'},
    {value: '10', name: 'Tháng 10'},
    {value: '11', name: 'Tháng 11'},
    {value: '12', name: 'Tháng 12'}, 
  ];


  loaiTK='month';

  public selectEvent: ChartSelectEvent;
  public imageURI = '';
  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [ ],
    options: {title: 'Doanh thu các tháng trong năm (VND)'}
  };
  public pieChart = {
    chartType: 'PieChart',
    dataTable: [
      ['SanPham', 'TongDoanhThu'],
      ['Laptop', 1100],
      ['Phụ kiện', 2000],
      ['Máy ảnh',  2202],
      ['Điện thoại',  3022],
    ],
    options: {
      title: 'Doanh thu tháng',
      slices: {
        0: {offset: 0.3},
        1: {offset: 0.2}
      }
    }
  };

  public lineChart:GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [],
    options: {title: 'Tổng số đơn hàng bán ra theo tháng'}
  };
  statisticOfYear:StatisticOfMonth[];
  years:number[];
  selectedYear=2019;
  line:number[];


  constructor(private statisticSV:StatisticService){
    this.getYears();
  }
  ngOnInit() {
  
    this.getStatisticOfYearColumn(2019);
    this.getExportsOfYear(2019);
  
  }

  getStatisticOfYearColumn(year:number){
    this.statisticSV.getSatisticOfYearColum(year).subscribe(
      data=>{
        this.statisticOfYear=data;
        this.fillColumn();
        this.columnChart.component.draw();
   
      }
    )
  }
  fillColumn(){
    this.columnChart.dataTable=[
      ['Tháng', 'Giá trị nhập', 'Giá trị bán'],
      ['Tháng 1', this.statisticOfYear[0].import, this.statisticOfYear[0].export],
      ['Tháng 2', this.statisticOfYear[1].import, this.statisticOfYear[1].export],
      ['Tháng 3', this.statisticOfYear[2].import, this.statisticOfYear[2].export],
      ['Tháng 4', this.statisticOfYear[3].import, this.statisticOfYear[3].export],
      ['Tháng 5', this.statisticOfYear[4].import, this.statisticOfYear[4].export],
      ['Tháng 6', this.statisticOfYear[5].import, this.statisticOfYear[5].export],
      ['Tháng 7', this.statisticOfYear[6].import, this.statisticOfYear[6].export],
      ['Tháng 8', this.statisticOfYear[7].import, this.statisticOfYear[7].export],
      ['Tháng 9', this.statisticOfYear[8].import, this.statisticOfYear[8].export],
      ['Tháng 10',this.statisticOfYear[9].import, this.statisticOfYear[9].export],
      ['Tháng 11', this.statisticOfYear[10].import, this.statisticOfYear[10].export],
      ['Tháng 12', this.statisticOfYear[11].import, this.statisticOfYear[11].export],
    ]
  }
  fillLine(){
    this.lineChart.dataTable = [
      ['Tháng','Tổng Số Đơn'],
      ['Tháng 1', this.line[0]],
      ['Tháng 2', this.line[1]],
      ['Tháng 3', this.line[2]],
      ['Tháng 4', this.line[3]],
      ['Tháng 5', this.line[4]],
      ['Tháng 6', this.line[5]],
      ['Tháng 7', this.line[6]],
      ['Tháng 8', this.line[7]],
      ['Tháng 9', this.line[8]],
      ['Tháng 10',this.line[9]],
      ['Tháng 11', this.line[10]],
      ['Tháng 12', this.line[11]],
    
    ];
  }

  getYears(){
    this.statisticSV.getYears().subscribe(data=>{console.log(data);this.years=data});
  }
  changeTheYear(){
    // this.selectedYear=selectedYear;
    console.log(this.selectedYear);
    this.getStatisticOfYearColumn(this.selectedYear);
    this.getExportsOfYear(this.selectedYear);
    this.columnChart.component.draw();
    this.lineChart.component.draw();
    console.log(this.selectedYear);
  }

  //
  getExportsOfYear(year:number){
    this.statisticSV.getExportOfyear(year).subscribe(data=>{
      this.line=data;
      this.fillLine();
      this.lineChart.component.draw();
    }

    );
  }
}