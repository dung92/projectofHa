import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrUpdateTimeTableRequest, EmployeeServiceProxy, EmployeeViewModel, SessionWorkServiceProxy, SessionWorkViewModel, TimeTableServiceProxy, TimeTableViewModel, TrainingClassServiceProxy, TrainingClassViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-create-or-update-timetable',
  templateUrl: './create-or-update-timetable.component.html',
})
export class CreateOrUpdateTimetableComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  timeTableList: TimeTableViewModel[] = [];
  timeTableFilter: TimeTableViewModel[] = []
  timeTableLessonCheck: TimeTableViewModel[] = [];

  sessionList: SessionWorkViewModel[] = [];
  employeeList: EmployeeViewModel[] = [];
  classList: TrainingClassViewModel[] = [];
  teacherList: EmployeeViewModel[] = [];
  dayName: string;
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() timeTableBinding: TimeTableViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder,
    private timeTableService: TimeTableServiceProxy,
    private sessionService: SessionWorkServiceProxy,
    private classService: TrainingClassServiceProxy,
    private employeeService: EmployeeServiceProxy,
  ) {
    this.createOrUpdateForm = this.fb.group({
      classId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      sessionId: ['', [Validators.required]],
      lesson: [''],
      day: ['',],
      date: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.getAllTimeTable('', undefined, undefined);
    this.getAllSession('')
    this.getAllClass('')
    this.getAllEmployee('')
    this.getTeacher(1)
    if (this.timeTableBinding != undefined) {
      this.dayName = this.timeTableBinding.day;
    }
  }
  //#endregion

  //#region validate

  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateTimeTableRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();

    var formValue = this.createOrUpdateForm.value

    //check lop bi trung
    if (this.timeTableBinding == undefined) {
      this.timeTableFilter = this.timeTableList.filter(x => x.classId == formValue.classId
        && x.sessionId == formValue.sessionId
        && x.date.format('YYYY-MM-DD') == formValue.date)
    }
    //check bai hoc bi trung
    if (this.timeTableBinding == undefined) {
      this.timeTableLessonCheck = this.timeTableList.filter(x => x.lesson == formValue.lesson
        && x.sessionId == formValue.sessionId
        && x.date.format('YYYY-MM-DD') == formValue.date)
    }

    if(this.timeTableLessonCheck.length > 0)
    {
      alert('ca này đã có lớp dạy bài học này')
    }
    else if (this.timeTableFilter.length > 0) {
      alert('thời gian biểu này đã tồn tại')
    }
    else {
      this.createOrUpdateTimeTable(value)
    }
  }

  closeForm() {
    this.closeEvent.emit();

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

  onChange(date: string) {
    const day = moment(date);
    const dow = day.day();

    switch (dow) {
      case 0:
        this.dayName = "Chủ nhật";
        break;
      case 1:
        this.dayName = "Thứ 2";
        break;
      case 2:
        this.dayName = "Thứ 3";
        break;
      case 3:
        this.dayName = "Thứ 4";
        break;
      case 4:
        this.dayName = "Thứ 5";
        break;
      case 5:
        this.dayName = "Thứ 6";
        break;
      case 6:
        this.dayName = "Thứ 7";
    }
  }

  getAllSession(keyword: string) {
    this.sessionService.getAllSessionWork(keyword).subscribe(x => this.sessionList = x);
  }

  getAllClass(keyword: string) {
    this.classService.getAllTrainingClass(keyword).subscribe(x => this.classList = x);
  }

  getAllEmployee(keyword: string) {
    this.employeeService.getAllEmployee(keyword).subscribe(x => this.employeeList = x);
  }

  createOrUpdateTimeTable(request: CreateOrUpdateTimeTableRequest) {
    if (this.timeTableBinding != undefined) {
      request.id = this.timeTableBinding.id
    }
    request.date = moment(this.createOrUpdateForm.value.date).subtract(-7, 'hours')
    this.timeTableService.createOrUpdateTimeTable(request).subscribe();
  }
  //#endregion

}
