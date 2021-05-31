import { Component, OnInit } from '@angular/core';
import { CustomerInTImeTableServiceProxy, CustomerInTimeTableViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-timetable-of-customer',
  templateUrl: './timetable-of-customer.component.html',
})
export class TimetableOfCustomerComponent implements OnInit {
  cusInClassList: CustomerInTimeTableViewModel[] = []

  constructor( private studentService: CustomerInTImeTableServiceProxy) { }

  ngOnInit(): void {
    this.getClassByCustomer();
  }

  getClassByCustomer() {
    this.studentService.getTimetableByCustomerId(Number(sessionStorage.getItem('loginAcountId'))).subscribe(x => this.cusInClassList = x)
  }
}
