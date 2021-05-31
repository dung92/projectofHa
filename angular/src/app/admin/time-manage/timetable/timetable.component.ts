import { Component, OnInit } from '@angular/core';
import { EmployeeServiceProxy, EmployeeViewModel, SessionWorkServiceProxy, SessionWorkViewModel, TimeTableServiceProxy, TimeTableViewModel, TrainingClassServiceProxy, TrainingClassViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
})
export class TimetableComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;
  collapse = 'Bộ lọc';
  isVisible1 = false;
  isConfirmLoading1 = false;

  showModal1(): void {
    this.isVisible1 = true;
  }

  handleOk1(): void {
    this.isConfirmLoading1 = true;
    // setTimeout(() => {
    //   this.isVisible1 = false;
    //   this.isConfirmLoading1 = false;
    // }, 1000);
  }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  sessionList: SessionWorkViewModel[] = [];
  employeeList: EmployeeViewModel[] = [];
  teacherList: EmployeeViewModel[] = [];
  classList: TrainingClassViewModel[] = [];
  
  timeTableList: TimeTableViewModel[] = [];
  timeTableByDayList : TimeTableViewModel[] = [];
  timeTableListFilter: TimeTableViewModel;
  dayList = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật',]
  //#endregion

  //#region contructor lify cycle hook
  constructor(private timeTableService: TimeTableServiceProxy,
    private sessionService: SessionWorkServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private classService: TrainingClassServiceProxy
    ) { }

  ngOnInit(): void {
    this.getAllTimeTable('',undefined,undefined);
    this.getAllSession('');
    this.getAllEmployee('');
    this.getAllClass('');
    this.getTeacher(1)
  }
  //#endregion

  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.timeTableListFilter = this.timeTableList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.timeTableListFilter = undefined

    this.getAllTimeTable('', undefined,undefined)
    setTimeout(() => {
      location.reload();
    }, 1000);

  }

  handleCancel(): void {
    this.isVisible = false;
    this.timeTableListFilter = undefined
  }

  getAllSession(keyword: string) {
    this.sessionService.getAllSessionWork(keyword).subscribe(x => this.sessionList = x);
  }
  getAllEmployee(keyword: string) {
    this.employeeService.getAllEmployee(keyword).subscribe(x => this.employeeList = x);
  }
  getAllClass(keyword: string) {
    this.classService.getAllTrainingClass(keyword).subscribe(x => this.classList = x);
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

  getTimeTableById(classId? : number, employeeId? : number, sessionId? : number) {
    this.timeTableService.getTimeTableById(classId, employeeId, sessionId).subscribe(x => this.timeTableList = x);
  }

  getTeacher(teacherId : number)
  {
    this.employeeService.getEmployeeByPosition(teacherId).subscribe(x => this.teacherList = x)
  }

  deleteTimeTable(id: number) {

    this.timeTableService.deleteTimeTable(id).subscribe();
    this.getAllTimeTable('',undefined,undefined)
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
