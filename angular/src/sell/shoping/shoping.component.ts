import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillServiceProxy, BillViewModel, CreateOrUpdateBillRequest, CreateOrUpdateProductInBillRequest, CustomerServiceProxy, CustomerViewModel, OptionServiceProxy, OptionViewModel, ProductCategoryServiceProxy, ProductCategoryViewModel, ProductInBillServiceProxy, ProductServiceProxy, ProductViewModel, ServiceServiceProxy, ServiceViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
})
export class ShopingComponent implements OnInit {

  size: NzSelectSizeType = 'default';
  binding1: string
  binding2: string
  binding3: string
  binding4: string
  showProductDescription: string
  showServiceDescription: string
  showOptionDescription: string
  productCategoryList: ProductCategoryViewModel[] = [];
  productList: ProductViewModel[] = [];
  optionList: OptionViewModel[] = [];
  servicetList: ServiceViewModel[] = [];
  customerList: CustomerViewModel[] = [];
  billList: BillViewModel[] = [];
  billCode: string;
  createForm: FormGroup;
  validateForm: FormGroup;
  billIdCreated: number;
  dateCreated = moment().format('YYYY-MM-DD');

  fromDateToCreate: string;
  toDateToCreate: string;
  isVisible = false;
  isConfirmLoading = false;

  customer : string;
  
  optionProcess : OptionViewModel;

  showProductName: string
  showServiceName: string
  showOptionName: string


  productCategory : ProductCategoryViewModel

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceProxy,
    private productServie: ProductServiceProxy,
    private serviceService: ServiceServiceProxy,
    private optionService: OptionServiceProxy,
    private billService: BillServiceProxy,
    private productInBillService: ProductInBillServiceProxy,
    private productCategoryService: ProductCategoryServiceProxy,
    private notification: NzNotificationService
  ) {
    this.createForm = this.fb.group({
      originalPrice: ['', [Validators.required]],
    });

    this.validateForm = this.fb.group({
      product: ['', [Validators.required]],
      service: ['', [Validators.required]],
      option: ['', [Validators.required]],
    });

    
  }

  onDateChange()
  {
    var amount: number
    // for (let item of this.optionList) {
    //   amount = item.amount
    // }
    if(this.optionProcess != undefined)
    {
      amount = this.optionProcess.amount;
    }
    this.toDateToCreate = moment(this.fromDateToCreate).subtract(-amount, 'month').format('YYYY-MM-DD').toString();

  }

  ngOnInit(): void {
    this.getAllOption('')
    this.getAllProduct('')
    this.getAllSercice('')
    this.getAllProductCategory('')
    this.getAllCustomer('')
    this.getAllBill('', undefined, undefined);
    this.createBillCode()
    this.customer = sessionStorage.getItem('loginAcountUserName')
  }
  submitForm(value: CreateOrUpdateBillRequest): void {
    for (const key in this.createForm.controls) {
      this.createForm.controls[key].markAsDirty();
      this.createForm.controls[key].updateValueAndValidity();
    }

    if (this.fromDateToCreate == undefined || this.toDateToCreate == undefined) {
      alert('bạn chưa nhập ngày')
    }
    else {
      this.createBillCode()
      var tempId = 0;
      for (let item of this.productCategoryList) {
        tempId = item.id;

      }

      if(sessionStorage.getItem('loginAcountId') != undefined)
      {
        this.CreateBill(value);
        setTimeout(() => {
          this.createProductInBill(tempId, this.billIdCreated, this.fromDateToCreate, this.toDateToCreate)
        }, 1000);
      }
      else
      {
        alert('Bạn cần đăng nhập để mua hàng')
        this.createBasicNotification('bottomRight');
      }
    }
  
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification
      .blank(
        'Trạng thái',
        'Thanh toán thành công',
        { nzPlacement: position }
      )
  }

  showModal(): void {
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
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.createForm.reset();

    this.createBillCode()
    this.dateCreated = moment().format('YYYY-MM-DD');
    e.preventDefault();

  }


  CreateBill(request: CreateOrUpdateBillRequest) {
    request.name = this.billCode;
    request.customerId = Number(sessionStorage.getItem('loginAcountId')) ;
    request.originalPrice = this.createForm.value.originalPrice;
    request.discount = 0;
    request.totalPrice = this.createForm.value.originalPrice;
    request.note = 'Khách mua hàng online';
    this.billService.createOrUpdateBill(request).subscribe(x => {
      this.billIdCreated = x
    })
  }

  createProductInBill(productCategoryId: number, billId: number, fromDate: string, toDate: string) {
    const request = new CreateOrUpdateProductInBillRequest
    request.productCategoryId = productCategoryId;
    request.billId = billId;
    request.fromDate = moment(fromDate).subtract(-7,'hours');
    request.toDate = moment(toDate).subtract(-7,'hours');
    this.productInBillService.createOrUpdateProductInBill(request).subscribe();
  }

  getAllProduct(keyword: string) {
    this.productServie.getAllProduct(keyword).subscribe(x => this.productList = x);
  }

  getAllOption(keyword: string) {
    this.optionService.getAllOption(keyword).subscribe(x => this.optionList = x);
  }

  getAllSercice(keyword: string) {
    this.serviceService.getAllService(keyword).subscribe(x => this.servicetList = x);
  }

  getAllProductCategory(keyword: string) {
    this.productCategoryService.getAllProductCategory(keyword).subscribe(x => this.productCategoryList = x)
  }

  getById(productId?: number, serviceId?: number, optionId?: number) {
    this.productCategoryService.getProductCategoryById(productId, serviceId, optionId).subscribe(x => this.productCategoryList = x)
    setTimeout(() => {
      if(this.productCategoryList.length == 0)
      {
        alert('Trung tâm hiện chưa phát triển gói dịch vụ này')
        this.optionProcess = this.optionList.find(x => x.id == optionId)
      }
      else
      {
        this.productCategory = this.productCategoryList.find(x => x.productId == productId
          && x.serviceId == serviceId
          && x.optionId == optionId
        )     
        this.optionProcess = this.optionList.find(x => x.id == optionId)      
      }
     
    }, 1000);
   
  }

  getProductDescriptionById(id: number) {
    var data = this.productList.find(x => x.id == id);
    if (data != undefined) {
      this.showProductDescription = data.description
      this.showProductName = data.name
    }
  }

  getServiceDescriptionById(id: number) {
    var data = this.servicetList.find(x => x.id == id);
    if (data != undefined) {
      this.showServiceDescription = data.description
      this.showServiceName = data.name
    }
  }

  getOptionDescriptionById(id: number) {
    var data = this.optionList.find(x => x.id == id);
    if (data != undefined) {
      this.showOptionDescription = data.description
      this.showOptionName = data.name
    }
  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerList = x);
  }

  getAllBill(keyword: string, fromDateFilter: moment.Moment, toDateFilter: moment.Moment) {
    this.billService.getAllBill(keyword, fromDateFilter, toDateFilter).subscribe(x => this.billList = x);
  }

  createBillCode() {
    this.billCode = 'HD' + (Math.floor(Math.random() * 89999999) + 10000000)
    for (let item of this.billList) {
      while (item.name.includes(this.billCode)) {
        this.billCode = 'HD' + (Math.floor(Math.random() * 89999999) + 10000000)
      }
    }
  }

}
