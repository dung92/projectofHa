import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateCustomerInTimeTableRequest, CustomerInTImeTableServiceProxy, CustomerInTimeTableViewModel, EmployeeServiceProxy, EmployeeViewModel, SessionWorkServiceProxy, SessionWorkViewModel, TimeTableServiceProxy, TimeTableViewModel, TrainingClassServiceProxy, TrainingClassViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  collapse = 'Bộ lọc';

  sessionList: SessionWorkViewModel[] = [];
  employeeList: EmployeeViewModel[] = [];
  teacherList: EmployeeViewModel[] = [];
  classList: TrainingClassViewModel[] = [];
  cusInClassList: CustomerInTimeTableViewModel[] = []

  timeTableList: TimeTableViewModel[] = [];
  timeTableByDayList: TimeTableViewModel[] = [];
  timeTableListFilter: TimeTableViewModel;
  dayList = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật',]
  //#endregion

  //#region contructor lify cycle hook
  constructor(private timeTableService: TimeTableServiceProxy,
    private sessionService: SessionWorkServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private classService: TrainingClassServiceProxy,
    private studentService: CustomerInTImeTableServiceProxy
  ) { }

  ngOnInit(): void {
    this.getAllTimeTable('', undefined, undefined);
    this.getAllSession('');
    this.getAllEmployee('');
    this.getAllClass('');
    this.getTeacher(1)
    this.getAllCustomerInClass('')
  }
  //#endregion

  //#region funtion

  getAllCustomerInClass(keyword: string) {
    this.studentService.getAllCustomerInTimeTable(keyword).subscribe(x => this.cusInClassList = x);
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

  getTimeTableById(classId?: number, employeeId?: number, sessionId?: number) {
    this.timeTableService.getTimeTableById(classId, employeeId, sessionId).subscribe(x => this.timeTableList = x);
  }

  getTeacher(teacherId: number) {
    this.employeeService.getEmployeeByPosition(teacherId).subscribe(x => this.teacherList = x)
  }

  addStudentIntoClass(timeTableId: number) {
    var request: CreateOrUpdateCustomerInTimeTableRequest = new CreateOrUpdateCustomerInTimeTableRequest();

    request.timeTableId = timeTableId;
    request.active = false;

    var dataChecked: CustomerInTimeTableViewModel[]
    dataChecked = this.cusInClassList.filter(x => x.customerId == Number(sessionStorage.getItem('loginAcountId')) 
    && x.timeTableId == timeTableId);
    if (dataChecked.length > 0) {
      alert('Bạn đã đăng kí vào lớp này rồi')
    }
    else {
      if (sessionStorage.getItem('loginAcountId') != undefined) {
        request.customerId = Number(sessionStorage.getItem('loginAcountId'));
        this.studentService.createOrUpdateCustomerInTimeTable(request).subscribe();
        alert('Đăng kí thành công')
        location.reload();
      }
      else {
        alert('Bạn phải đăng nhập để có thể đăng kí học')
      }
    }
  }

  cancelRegisterStudentInClass(timeTableId: number)
  {
    var dataChecked: CustomerInTimeTableViewModel
    dataChecked = this.cusInClassList.find(x => x.customerId == Number(sessionStorage.getItem('loginAcountId')) 
    && x.timeTableId == timeTableId);

    if(dataChecked != undefined)
    {
      this.studentService.deleteCustomeInTimeTable(dataChecked.id).subscribe();
      alert('Hủy thành công')
      location.reload();
    }
    else
    {
      alert('Bạn chưa đăng kí vào lớp này')
    }
    
  }

}
