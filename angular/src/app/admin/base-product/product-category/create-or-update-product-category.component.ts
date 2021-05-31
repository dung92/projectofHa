import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrUpdateProductCategoryRequest, OptionServiceProxy, OptionViewModel, ProductCategoryServiceProxy, ProductCategoryViewModel, ProductServiceProxy, ProductViewModel, ServiceServiceProxy, ServiceViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-update-product-category',
  templateUrl: './create-or-update-product-category.component.html',
})
export class CreateOrUpdateProductCategoryComponent implements OnInit {

  //#region variable
  createOrUpdateProductCategoryForm: FormGroup;
  productList: ProductViewModel[] = [];
  optionList: OptionViewModel[] = [];
  servicetList: ServiceViewModel[] = [];
  productCategoryList: ProductCategoryViewModel[] = [];
  //#endregion

  //#region input output
  @Input() productEdited: ProductCategoryViewModel
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  //#endregion

  //#region contructor life cycle hook
  constructor(
    private productServie: ProductServiceProxy,
    private serviceService: ServiceServiceProxy,
    private optionService: OptionServiceProxy,
    private productCategoryService: ProductCategoryServiceProxy,
    private fb: FormBuilder
  ) {
    this.createOrUpdateProductCategoryForm = this.fb.group({
      productId: ['', [Validators.required]],
      serviceId: ['', [Validators.required]],
      optionId: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllOption('')
    this.getAllProduct('')
    this.getAllSercice('')
    this.getAllProductCategory('')



  }
  //#endregion

  //#region function

  closeForm() {
    this.closeEvent.emit();
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

  submitForm(value: CreateOrUpdateProductCategoryRequest): void {
    for (const key in this.createOrUpdateProductCategoryForm.controls) {
      this.createOrUpdateProductCategoryForm.controls[key].markAsDirty();
      this.createOrUpdateProductCategoryForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.saveEvent.emit();
    this.createOrUpdateProductCategory(value);
  }

  createOrUpdateProductCategory(request: CreateOrUpdateProductCategoryRequest) {
    if (this.productEdited != undefined) {
      request.id = this.productEdited.id
    }

    var dataChecked: ProductCategoryViewModel[]
    dataChecked = this.productCategoryList.filter(x => x.productId == this.createOrUpdateProductCategoryForm.value.productId
      && x.optionId == this.createOrUpdateProductCategoryForm.value.optionId
      && x.serviceId == this.createOrUpdateProductCategoryForm.value.serviceId)

    if (dataChecked.length > 0 && this.productEdited == undefined) {
      alert('Sản phẩm này đã tồn tại')
    }
    else {
      this.productCategoryService.createOrUpdateProductCategory(request).subscribe();
    }

  }
  //#endregion
}
