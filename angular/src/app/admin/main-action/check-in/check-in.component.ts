import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateCustomerInTimeTableRequest, CustomerInTImeTableServiceProxy, CustomerInTimeTableViewModel, CustomerServiceProxy, CustomerViewModel, ProductInBillServiceProxy, ProductInBillViewModel, TimeTableServiceProxy, TimeTableViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
})
export class CheckInComponent implements OnInit {

  totalStudent: number;
  customerList: CustomerViewModel[] = [];
  customerFullList: CustomerViewModel[] = [];
  timeTableList: TimeTableViewModel[] = [];
  productInBillList: ProductInBillViewModel[] = [];
  productInBillListFilter: ProductInBillViewModel[] = [];
  binding3: string
  isVisible = false;
  cusInClassList: CustomerInTimeTableViewModel[] = []
  allStudentList: CustomerInTimeTableViewModel[] = []

  constructor(private customerService: CustomerServiceProxy,
    private productInBillService: ProductInBillServiceProxy,
    private customerInClassService: CustomerInTImeTableServiceProxy,
    private timeTableService: TimeTableServiceProxy,) { }

  ngOnInit(): void {
    this.getAllCustomer('');
    this.getTimeTableByDate();
    this.getAllStudent();
  }

  getAllStudent() {
    this.customerInClassService.getAllCustomerInTimeTable('').subscribe(x => this.allStudentList = x)
  }

  getStudentByClassId(id: number) {
    this.customerInClassService.getCustomerByTimeTableId(id).subscribe(x => this.cusInClassList = x);
    setTimeout(() => {
      this.totalStudent = this.cusInClassList.length
    }, 500);
  }

  showModal(id: number): void {
    this.getStudentByClassId(id);
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerFullList = x);
  }

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id).subscribe(x => this.customerList = x)
  }

  getProductInBillByCustomerId(customerId: number) {
    this.productInBillService.getProductInBillByCustomerId(customerId).subscribe(x => this.productInBillList = x)
    setTimeout(() => {
      this.productInBillListFilter = this.productInBillList.filter(x => x.toDate.isAfter(moment()) == true)
    }, 500);
    
  }

  getAllTimeTable(keyword: string, fromDate: string, toDate: string) {
    var fromDateConvert
    var toDateConvert
    if (fromDate != undefined) {
      fromDateConvert = moment(fromDate)
    }
    else {
      fromDateConvert = undefined
    }

    if (fromDate != undefined) {
      toDateConvert = moment(toDate)
    }
    else {
      toDateConvert = undefined
    }

    this.timeTableService.getAllTimeTable(keyword, fromDateConvert, toDateConvert).subscribe(x => this.timeTableList = x);
  }

  getTimeTableByDate() {
    this.timeTableService.getTimeTableByDate(moment(moment().format('YYYY MM DD'))).subscribe(x => this.timeTableList = x)
  }

  insertCustomerIntoClass(cusId: number, classId: number) {

    var request = new CreateOrUpdateCustomerInTimeTableRequest();

    var dataChecked: CustomerInTimeTableViewModel
    dataChecked = this.allStudentList.find(x => x.customerId == cusId
      && x.timeTableId == classId);

    if (dataChecked != undefined && dataChecked.active == true) {
      alert('Bạn đã thêm người này vào lớp này')
    }
    else if (dataChecked != undefined && dataChecked.active == false) {
      request.id = dataChecked.id
      request.active = true
      request.customerId = cusId;
      request.timeTableId = classId;
      this.customerInClassService.createOrUpdateCustomerInTimeTable(request).subscribe();
      alert('Đã check in vào lớp học thành công')
    }
    else if(dataChecked == undefined)
    {
      request.customerId = cusId;
      request.timeTableId = classId;
      request.active = true;
      this.customerInClassService.createOrUpdateCustomerInTimeTable(request).subscribe();
      alert('Đã Thêm vào lớp học thành công')
    }

  }
}
