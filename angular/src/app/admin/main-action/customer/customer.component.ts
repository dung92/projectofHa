import { Component, OnInit } from '@angular/core';
import { CustomerServiceProxy, CustomerViewModel } from '@shared/service-proxies/service-proxies';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  //#region  variable
  isVisible = false;
  isConfirmLoading = false;

  customerList: CustomerViewModel[] = [];
  customerListFilter: CustomerViewModel;
  //#endregion

  //#region contructor
  constructor(private customerService: CustomerServiceProxy) { }

  ngOnInit(): void {
    this.getAllCustomer('');
  }
  //#endregion

  //#region function
  showModal(id?: number): void {
    if (id != undefined) {
      this.customerListFilter = this.customerList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.customerListFilter = undefined

    this.getAllCustomer('')
    setTimeout(() => {
      location.reload();
    }, 500);

  }

  handleCancel(): void {
    this.isVisible = false;
    this.customerListFilter = undefined
  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerList = x);
  }

  deleteCustomer(id: number) {

    this.customerService.deleteCustomer(id).subscribe();
    this.getAllCustomer('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
