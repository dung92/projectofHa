import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateCustomerRequest, CustomerServiceProxy, CustomerViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-customer',
  templateUrl: './create-or-update-customer.component.html',
})
export class CreateOrUpdateCustomerComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  customerList: CustomerViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() customerBinding: CustomerViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private customerService: CustomerServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      adress: [''],
      born: [''],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getAllCustomer('');
  }
  //#endregion

  //#region validate
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateCustomerRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();
    this.createOrUpdateCustomer(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerList = x);

  }

  createOrUpdateCustomer(request: CreateOrUpdateCustomerRequest) {
    if (this.customerBinding != undefined) {
      request.id = this.customerBinding.id
    }
    request.name = this.createOrUpdateForm.value.name;
    request.phoneNumber = this.createOrUpdateForm.value.phoneNumber;
    request.adress = this.createOrUpdateForm.value.adress;
    request.born = moment(this.createOrUpdateForm.value.born)
    request.userName = this.createOrUpdateForm.value.userName;
    request.password = this.createOrUpdateForm.value.password;
    request.email = this.createOrUpdateForm.value.email;

    this.customerService.createOrUpdateCustomer(request).subscribe();
  }
  //#endregion

}
