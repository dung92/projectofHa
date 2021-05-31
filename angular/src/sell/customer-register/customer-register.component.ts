import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrUpdateCustomerRequest, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
})
export class CustomerRegisterComponent implements OnInit {

  createOrUpdateForm: FormGroup;

  submitForm(value: CreateOrUpdateCustomerRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.createOrUpdateCustomer(value)
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.createOrUpdateForm.reset();
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsPristine();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
  }


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
   
  }

  createOrUpdateCustomer(request: CreateOrUpdateCustomerRequest) {
    request.name = this.createOrUpdateForm.value.name;
    request.phoneNumber = this.createOrUpdateForm.value.phoneNumber;
    request.adress = this.createOrUpdateForm.value.adress;
    request.born = moment(this.createOrUpdateForm.value.born)
    request.userName = this.createOrUpdateForm.value.userName;
    request.password = this.createOrUpdateForm.value.password;
    request.email = this.createOrUpdateForm.value.email;

    this.customerService.createOrUpdateCustomer(request).subscribe();
  }

}
