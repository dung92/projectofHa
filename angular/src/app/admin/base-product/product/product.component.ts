import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateProductRequest, ProductServiceProxy, ProductViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  productList: ProductViewModel[] = [];
  productListFilter: ProductViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private productService: ProductServiceProxy) { }

  ngOnInit(): void {
    this.getAllProduct('');
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.productListFilter = this.productList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.productListFilter = undefined

    this.getAllProduct('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.productListFilter = undefined
  }

  getAllProduct(keyword: string) {
    this.productService.getAllProduct(keyword).subscribe(x => this.productList = x);
  }

  deleteProduct(id: number) {

    this.productService.deleteProduct(id).subscribe();
    this.getAllProduct('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
