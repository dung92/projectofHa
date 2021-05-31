import { Component, OnInit } from '@angular/core';
import { BillServiceProxy, BillViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { from } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent implements OnInit {

  //#region  variable
  isVisible = false;
  isConfirmLoading = false;
  collapse = 'Bộ lọc';

  billList: BillViewModel[] = [];
  billListFilter: BillViewModel;
  //#endregion

  //#region contructor
  constructor(private billService: BillServiceProxy) { }

  ngOnInit(): void {
    this.getAllBill('','','');
  }
  //#endregion

  //#region function
  showModal(id?: number): void {
    if (id != undefined) {
      this.billListFilter = this.billList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.billListFilter = undefined

    this.getAllBill('',undefined,undefined)
    setTimeout(() => {
      location.reload();
    }, 500);

  }

  handleCancel(): void {
    this.isVisible = false;
    this.billListFilter = undefined
  }

  getAllBill(keyword: string, fromDateFilter : string, toDateFilter : string) {
    var fromDateConvert = null;
    var toDateConvert = null;
    if(fromDateFilter != '')
    {
      fromDateConvert = moment(fromDateFilter);
    }
    else
    {
      fromDateConvert = undefined
    }
    if(toDateFilter != '')
    {
      toDateConvert = moment(toDateFilter);
    }
    else
    {
      toDateConvert = undefined
    }

    this.billService.getAllBill(keyword,fromDateConvert,toDateConvert).subscribe(x => this.billList = x);
  }

  deleteBill(id: number) {

    this.billService.deleteBill(id).subscribe();
    this.getAllBill('','','')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
