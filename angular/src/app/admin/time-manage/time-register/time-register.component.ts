import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateTimeTableRequest, EmployeeServiceProxy, EmployeeViewModel, SessionWorkServiceProxy, SessionWorkViewModel, TimeTableServiceProxy, TimeTableViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-time-register',
  templateUrl: './time-register.component.html',
})
export class TimeRegisterComponent implements OnInit {

  collapse = 'Bộ lọc';
  size: NzButtonSize = 'small'; //size of button
  sessionList: SessionWorkViewModel[] = [];
  teacherList: EmployeeViewModel[] = [];
  teacherId: number;
  timeTableFilter: TimeTableViewModel
  timeTableList: TimeTableViewModel[] = [];
  dayList = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật',]
  //#endregion

  //#region contructor lify cycle hook
  constructor(private timeTableService: TimeTableServiceProxy,
    private sessionService: SessionWorkServiceProxy,
    private employeeService: EmployeeServiceProxy,
  ) { }

  ngOnInit(): void {
    this.getAllTimeTable('', undefined, undefined);
    this.getAllSession('');
    this.getTeacher(1);
  }
  //#endregion

  getAllSession(keyword: string) {
    this.sessionService.getAllSessionWork(keyword).subscribe(x => this.sessionList = x);
  }

  getTeacher(teacherId: number) {
    this.employeeService.getEmployeeByPosition(teacherId).subscribe(x => this.teacherList = x)
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

  Cancel(request: CreateOrUpdateTimeTableRequest) {
    request.employeeId = 1
    this.timeTableService.createOrUpdateTimeTable(request).subscribe();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  createOrUpdateTimeTable(request: CreateOrUpdateTimeTableRequest) {
    for (let item of this.timeTableList) {
      for (let childItem of this.teacherList) {
        if (childItem.userName == item.curentUserName) {
          this.teacherId = childItem.id

        }
      }
    }


    this.timeTableFilter = this.timeTableList.find(x => x.employeeId == this.teacherId
      && x.sessionId == request.sessionId
      && x.date.format('YYYY-MM-DD') == request.date.format('YYYY-MM-DD')
    )

    request.date = moment(request.date.format('YYYY-MM-DDThh:mm:ss'));

    if (this.teacherList.length == 1) {
      alert('Bạn chưa cho giáo viên nào')
    }
    else if (this.timeTableList.includes(this.timeTableFilter)) {
      alert('1 giáo viên không thể dạy 2 lớp trong cùng 1 ca')
    }
    else {
      request.employeeId = this.teacherId;

      setTimeout(() => {
        this.timeTableService.createOrUpdateTimeTable(request).subscribe();
        location.reload();
      }, 1000);
    }
  }
}
