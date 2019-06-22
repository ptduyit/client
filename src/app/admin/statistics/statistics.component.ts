import { Component, OnInit } from '@angular/core';
import { ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
   ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { StatisticService } from 'src/app/service/statistic.service';
import { StatisticOfMonth } from 'src/app/model/statisticmonth';
import { CategoryOfMonth } from 'src/app/model/categoryofmonth';

@Component({ 
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  months:number[]= [1,2,3,4,5,6,7,8,9,10];


  loaiTK='month';

  public selectEvent: ChartSelectEvent;
  public imageURI = '';
  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [ ],
    options: {title: 'Doanh thu các tháng trong năm (VND)'}
  };
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [ ],
    options: {
      title: 'Loại Sản Phẩm ',
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
  categoryOfMonth:CategoryOfMonth[];
  years:number[];
  selectedYear=2019;
  selectedMonth=1;
  line:number[];
  totalImport:number;
  totalExport:number;
  statistic:number;
  monthImport:number;
  monthExport:number;
  monthStatistic:number;

  constructor(private statisticSV:StatisticService){
    this.getYears();
  }
  ngOnInit() {
  
    this.getStatisticOfYearColumn(2019);
    this.getExportsOfYear(2019);
    this.getDataForPipe();
    this.getStatisticOfyear();
    this.getStatisticOnMonthOfYear();
  
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
  fillPipe(){ 
    this.pieChart.dataTable=[];
    this.pieChart.dataTable[0]=  ['Loại Sản Phẩm', 'Tổng Doanh Thu'];
    for(let i=0;i<this.categoryOfMonth.length;i++){
      console.log([this.categoryOfMonth[i].categoryName,this.categoryOfMonth[i].cost]);
      this.pieChart.dataTable[i+1]=[this.categoryOfMonth[i].categoryName,this.categoryOfMonth[i].cost]; 
    }
      console.log(this.pieChart.dataTable);
  }

  getYears(){
    this.statisticSV.getYears().subscribe(data=>{console.log(data);this.years=data});
  }
  changeTheYear(){
    console.log(this.selectedYear);
    this.getStatisticOfYearColumn(this.selectedYear);
    this.getExportsOfYear(this.selectedYear);
    this.columnChart.component.draw();
    this.lineChart.component.draw();
    this.getStatisticOfyear();
    this.getDataForPipe();
    this.getStatisticOnMonthOfYear();
  }
  changeTheMonth(){
    this.getDataForPipe();
    this.pieChart.component.draw();
    this.getStatisticOnMonthOfYear();
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
  getDataForPipe(){
    console.log(this.selectedMonth+"/"+this.selectedYear)
    this.statisticSV.getCateogyByMonth(this.selectedMonth,this.selectedYear).subscribe(
      data=>{
        console.log(data);
        this.categoryOfMonth=data;
        this.fillPipe();
        this.pieChart.component.draw();

      }
    )
  }
  getStatisticOfyear(){
    this.statisticSV.getStatisticOfYear(this.selectedYear).subscribe(
      data=>{
        this.totalImport=data[0];
        this.totalExport=data[1];
        this.statistic=this.totalExport-this.totalImport
      }
    )
  }
  getStatisticOnMonthOfYear(){
    this.statisticSV.getStatisticOnMonthOfYear(this.selectedYear,this.selectedMonth).subscribe(
      data=>{
        console.log(this.selectedYear,this.selectedMonth);
        console.log(data);
        this.monthImport=data[0];
        this.monthExport=data[1];
        this.monthStatistic=this.monthExport-this.monthImport;
      }
    )
  }
}