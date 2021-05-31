import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateEmployeeRequest, EmployeeServiceProxy, EmployeeViewModel, PositionServiceProxy, PositionViewModel, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-employee',
  templateUrl: './create-or-update-employee.component.html',
})
export class CreateOrUpdateEmployeeComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  employeeList: EmployeeViewModel[] = [];
  positionList: PositionViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() employeeBinding: EmployeeViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, 
    private employeeService: EmployeeServiceProxy, 
    private positionService: PositionServiceProxy,
    public userService: UserServiceProxy) 
    {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      born: [undefined, [Validators.required]],
      adress: ['', ],
      phoneNumber: ['', ],
      salary: ['',],
      fromDate: ['', [Validators.required]],
      status: ['', ],
      position: ['', ],
    });
  }

  ngOnInit(): void {
    this.getAllEmployee('');
    this.getAllPosition('');
  }
  //#endregion


  //#region function
  submitForm(value: CreateOrUpdateEmployeeRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();

    console.log(value)
    console.log(typeof(this.createOrUpdateForm.value.born))
    console.log(typeof(this.createOrUpdateForm.value.fromDate))
    this.createOrUpdateEmployee(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }
  getAllPosition(keyword: string) {
    this.positionService.getAllPosition(keyword).subscribe(x => this.positionList = x);
  }

  getAllEmployee(keyword: string) {
    this.employeeService.getAllEmployee(keyword).subscribe(x => this.employeeList = x);

  }

  createOrUpdateEmployee(request: CreateOrUpdateEmployeeRequest) {
    if (this.employeeBinding != undefined) {
      request.id = this.employeeBinding.id
      request.userName = this.employeeBinding.userName
      request.password = this.employeeBinding.password
    }
    request.born = moment(this.createOrUpdateForm.value.born).subtract(-7,'hours');
    request.fromDate = moment(this.createOrUpdateForm.value.fromDate).subtract(-7,'hours');
    request.phoneNumber = this.createOrUpdateForm.value.phoneNumber
    request.adress = this.createOrUpdateForm.value.adress
    request.salary = this.createOrUpdateForm.value.salary
    request.status = this.createOrUpdateForm.value.status
    request.positionId = this.createOrUpdateForm.value.position 
    request.name = this.createOrUpdateForm.value.name

    console.log(request.born)
    this.employeeService.createOrUpdateEmployee(request).subscribe();
  }
  //#endregion

}
