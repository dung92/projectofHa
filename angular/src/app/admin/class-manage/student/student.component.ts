import { Component, OnInit } from '@angular/core';
import { CustomerInTImeTableServiceProxy, CustomerInTimeTableViewModel, TimeTableServiceProxy, TimeTableViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {

  totalStudent : number;
  collapse = 'Bộ lọc';
  cusInClassList : CustomerInTimeTableViewModel[] = []
  timeTableList: TimeTableViewModel[] = [];
  constructor(private customerInClassService : CustomerInTImeTableServiceProxy,
    private timeTableService: TimeTableServiceProxy,) { }

  ngOnInit(): void {
    this.getAllTimeTable('', undefined,undefined)
  }

  getAllCustomerInClass(keyword : string)
  {
    this.customerInClassService.getAllCustomerInTimeTable(keyword).subscribe(x => this.cusInClassList = x);
  }

  getStudentByClassId(id : number)
  {
    this.customerInClassService.getCustomerByTimeTableId(id).subscribe(x => this.cusInClassList = x);
    setTimeout(() => {
      this.totalStudent = this.cusInClassList.length;
    }, 500);
   
  }

  getAllTimeTable(keyword:string, fromDate : string, toDate : string) {
    var fromDateConvert
    var toDateConvert
    if(fromDate != undefined)
    {
      fromDateConvert = moment(fromDate)
    }
    else
    {
      fromDateConvert = undefined
    }

    if(fromDate != undefined)
    {
      toDateConvert = moment(toDate)
    }
    else
    {
      toDateConvert = undefined
    }
    
    this.timeTableService.getAllTimeTable(keyword, fromDateConvert, toDateConvert).subscribe(x => this.timeTableList = x);
  }

  deleteStudentFromClass(id : number)
  {
    this.customerInClassService.deleteCustomeInTimeTable(id).subscribe();
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }
}
