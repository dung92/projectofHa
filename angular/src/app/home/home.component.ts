import { Component, Injector, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BillServiceProxy, BillViewModel, CustomerServiceProxy, CustomerViewModel, ProductInBillServiceProxy, ProductInBillViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  loading = false;
  yogaPercent: number;
  dancePercent: number;

  yogaRevenueToday: number;
  danceRevenueToday: number;
  yogaRevenueForMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  danceRevenueForMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  customerList: CustomerViewModel[] = [];
  customerListShow: CustomerViewModel[] = [];
  productInBillList: ProductInBillViewModel[] = [];
  onlineShoping: ProductInBillViewModel[] = [];
  onlinePercent: number;
  yogaBillListFilter: ProductInBillViewModel[] = [];
  dacneBillListFilter: ProductInBillViewModel[] = [];
  constructor(injector: Injector,
    private productInBillService: ProductInBillServiceProxy,
    private customerService: CustomerServiceProxy,) {
    super(injector);

  }

  ngOnInit(): void {
    this.getAllProductInBill('');
    this.getAllCustomer('')
    setTimeout(() => {
      this.getYogaRevenueForMonth()
      this.getDanceRevenueForMonth();
    }, 1000);
  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerList = x);
    var j = 0
    setTimeout(() => {
      if (this.customerList.length == 1) {
        this.customerListShow[0] = this.customerList[this.customerList.length - 1]
      }
      else if (this.customerList.length == 2) {
        this.customerListShow[0] = this.customerList[this.customerList.length - 1]
        this.customerListShow[1] = this.customerList[this.customerList.length - 2]
      }
      else if (this.customerList.length == 3) {
        this.customerListShow[0] = this.customerList[this.customerList.length - 1]
        this.customerListShow[1] = this.customerList[this.customerList.length - 2]
        this.customerListShow[2] = this.customerList[this.customerList.length - 3]
      }
    }, 1000);

  }


  getAllProductInBill(keyword: string) {
    this.productInBillService.getAllProductInBill(keyword).subscribe(x => {
      this.productInBillList = x
      setTimeout(() => {
        this.onlineShoping = this.productInBillList.filter(x => x.note == 'Khách mua hàng online');
        this.onlinePercent = (this.onlineShoping.length / this.productInBillList.length) * 100
        console.log(this.onlinePercent)
      }, 1000);

    });
  }
  getYogaRevenue() {
    this.yogaBillListFilter = this.productInBillList.filter(x => x.dateCreated.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && x.productName == "Yoga")

    if (this.yogaBillListFilter.length == 0) {
      this.yogaRevenueToday = 0
    }
    else {
      this.yogaRevenueToday = 0
      for (let item of this.yogaBillListFilter) {
        this.yogaRevenueToday += item.totalPrice
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i == moment().month()) {
        console.log(i)
        this.yogaPercent = Math.round((this.yogaRevenueToday / this.yogaRevenueForMonth[i]) * 100)
        break
      }
    }
  }
  getDanceRevenue() {
    this.dacneBillListFilter = this.productInBillList.filter(x => x.dateCreated.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && x.productName == "Dance")

    if (this.dacneBillListFilter.length == 0) {
      this.danceRevenueToday = 0
    }
    else {
      this.danceRevenueToday = 0
      for (let item of this.dacneBillListFilter) {
        this.danceRevenueToday += item.totalPrice
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i == moment().month()) {
        console.log(i)
        this.dancePercent = Math.round((this.danceRevenueToday / this.danceRevenueForMonth[i]) * 100)
        break
      }
    }
  }
  getYogaRevenueForMonth() {
    for (var i = 0; i < 12; i++) {
      for (let item of this.productInBillList) {
        if (item.dateCreated.month() == i && item.dateCreated.year() == moment().year() && item.productName == "Yoga") {
          this.yogaRevenueForMonth[i] += item.totalPrice;
        }
      }
    }
  }

  getDanceRevenueForMonth() {
    for (var i = 0; i < 12; i++) {
      for (let item of this.productInBillList) {
        if (item.dateCreated.month() == i && item.dateCreated.year() == moment().year() && item.productName == "Dance") {
          this.danceRevenueForMonth[i] += item.totalPrice;
        }
      }
    }
  }

  //Biểu đồ tăng trưởng doanh thu
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: this.yogaRevenueForMonth, label: 'Yoga' },
    { data: this.danceRevenueForMonth, label: 'Dance' }
  ];

  public chartLabels: Array<any> = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  //Biểu đồ tăng trưởng doanh thu

  //--------------------------------------------------------------------------------------------
  public chartType1: string = 'bar';

  public chartDatasets1: Array<any> = [
    { data: this.yogaRevenueForMonth, label: 'Yoga' },
    { data: this.danceRevenueForMonth, label: 'Dance' }
  ];

  public chartLabels1: Array<any> = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  public chartColors1: Array<any> = [
    {
      backgroundColor: [
        '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1',
      ],
      borderColor: [
        '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1',
      ],
      borderWidth: 2,
    },
    {
      backgroundColor: [
        '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c',
      ],
      borderColor: [
        '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c', '#af050c',
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions1: any = {
    responsive: true
  };
  public chartClicked1(e: any): void { }
  public chartHovered1(e: any): void { }

  //---------------------------------------------------------------
  public chartType2: string = 'doughnut';

  public chartDatasets2: Array<any> = [
    { data: [20, 40, 10, 30], label: 'My First dataset' }
  ];

  public chartLabels2: Array<any> = ['Google', 'Facebook', 'Youtube', 'Website'];

  public chartColors2: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
      borderWidth: 2,
    }
  ];

  public chartOptions2: any = {
    responsive: true
  };
  public chartClicked2(e: any): void { }
  public chartHovered2(e: any): void { }
}
