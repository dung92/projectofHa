import { Component, OnInit } from '@angular/core';
import { OptionServiceProxy, OptionViewModel, ProductCategoryServiceProxy, ProductCategoryViewModel, ProductServiceProxy, ProductViewModel, ServiceServiceProxy, ServiceViewModel } from '@shared/service-proxies/service-proxies';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
})
export class ProductCategoryComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  size: NzSelectSizeType = 'default';
  binding1  :string
  binding2  :string
  binding3  :string

  productCategoryEdited : ProductCategoryViewModel;
  productList: ProductViewModel[] = [];
  optionList: OptionViewModel[] = [];
  servicetList: ServiceViewModel[] = [];
  productCategoryList: ProductCategoryViewModel[] = [];
  //#endregion

  //#region contructor life cycle hook
  constructor(
    private productServie : ProductServiceProxy,
    private serviceService : ServiceServiceProxy,
    private optionService : OptionServiceProxy,
    private productCategoryService : ProductCategoryServiceProxy,
    ) { }

  ngOnInit(): void {
    this.getAllOption('')
    this.getAllProduct('')
    this.getAllSercice('')
    this.getAllProductCategory('')
  }
  //#endregion

  //#region function
  showModal(productCategorySelected? : ProductCategoryViewModel): void {
    if(productCategorySelected != undefined)
    {
      this.productCategoryEdited = productCategorySelected
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.getAllProductCategory('')

    
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
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

  getAllProductCategory(keyword : string)
  {
    this.productCategoryService.getAllProductCategory(keyword).subscribe(x => this.productCategoryList = x)
  }

  getById(productId? : number, serviceId? : number, optionId? : number)
  {
    this.productCategoryService.getProductCategoryById(productId,serviceId,optionId).subscribe(x => this.productCategoryList = x)
  }

  deleteProductCategory(id : number)
  {
    this.productCategoryService.deleteProductCategory(id).subscribe()
    this.getAllProductCategory('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
