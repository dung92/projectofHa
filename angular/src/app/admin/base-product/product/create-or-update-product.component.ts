import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateProductRequest, ProductServiceProxy, ProductViewModel } from '@shared/service-proxies/service-proxies';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-product',
  templateUrl: './create-or-update-product.component.html',
})
export class CreateOrUpdateProductComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  productList: ProductViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() productBinding: ProductViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private productService: ProductServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllProduct('');
  }
  //#endregion

  //#region validate
 
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateProductRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();

    console.log(value)
    this.createOrUpdateProduct(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }

  getAllProduct(keyword: string) {
    this.productService.getAllProduct(keyword).subscribe(x => this.productList = x);

  }

  createOrUpdateProduct(request: CreateOrUpdateProductRequest) {
    if (this.productBinding != undefined) {
      request.id = this.productBinding.id
    }
    request.name = this.createOrUpdateForm.value.name;
    request.description = this.createOrUpdateForm.value.description;
    this.productService.createOrUpdateProduct(request).subscribe();
  }
  //#endregion
}
