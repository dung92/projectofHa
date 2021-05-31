import { Component, OnInit } from '@angular/core';
import { BillServiceProxy, ProductInBillServiceProxy, ProductInBillViewModel } from '@shared/service-proxies/service-proxies';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-product-in-bill',
  templateUrl: './product-in-bill.component.html',

})
export class ProductInBillComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  size: NzSelectSizeType = 'default';

  productInBillList: ProductInBillViewModel[] = [];
  productInBillBinding: ProductInBillViewModel
  //#endregion

  //#region contructor life cycle hook
  constructor(
    private productInBillService: ProductInBillServiceProxy,
    private billService: BillServiceProxy,
  ) { }

  ngOnInit(): void {
    this.getAllProductInBill('')
  }
  //#endregion

  //#region function
  showModal(binding: any): void {

    if (binding != undefined) {
      this.productInBillBinding = binding;
    }
    
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    setTimeout(() => {
      location.reload();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  getAllProductInBill(keyword: string) {
    this.productInBillService.getAllProductInBill(keyword).subscribe(x => {
      this.productInBillList = x
    });
  }

  deleteProductCategory(ProductInBillid: number, billId: number) {
    this.productInBillService.deleteProductInBill(ProductInBillid).subscribe()
    this.billService.deleteBill(billId).subscribe();
    this.getAllProductInBill('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
