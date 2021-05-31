import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BillServiceProxy, BillViewModel, CreateOrUpdateBillRequest } from '@shared/service-proxies/service-proxies';
import * as moment1 from 'moment';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-bill',
  templateUrl: './create-or-update-bill.component.html',
})
export class CreateOrUpdateBillComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  billList: BillViewModel[] = [];
  billCode : string;
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() billBinding: BillViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private billService: BillServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      userCreated: ['', [Validators.required]],
      originalPrice: ['',[Validators.required]],
      Discout: ['',[Validators.required]],
      totalPrice: ['', [Validators.required]],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.getAllBill('',undefined,undefined);
    this.createBillCode();
    console.log(this.billCode)
  }
  //#endregion

  //#region validate
  
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateBillRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();
    this.createOrUpdateBill(value)
  }

  closeForm() {
    this.closeEvent.emit();
  }

  createBillCode(){
    this.billCode = 'HD'+ (Math.floor(Math.random() * 89999999) + 10000000)
    for(let item of this.billList)
    {
      item.name.includes(this.billCode)
      this.billCode = 'HD'+ (Math.floor(Math.random() * 89999999) + 10000000)
    }   
  }

  getAllBill(keyword: string, fromDateFilter : moment1.Moment, toDateFilter : moment1.Moment) {
   
    this.billService.getAllBill(keyword,fromDateFilter,toDateFilter).subscribe(x => this.billList = x);

  }

  createOrUpdateBill( request: CreateOrUpdateBillRequest) {
    if (this.billBinding != undefined) {
      request.id = this.billBinding.id
    }
    request.name = this.createOrUpdateForm.value.name;
   

    this.billService.createOrUpdateBill(request).subscribe();
  }
  //#endregion
}
