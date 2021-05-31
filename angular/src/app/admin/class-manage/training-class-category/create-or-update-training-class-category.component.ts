import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateTrainingClassCategoryRequest, ProductServiceProxy, ProductViewModel, TrainingClassCategoryServiceProxy, TrainingClassCategoryViewModel } from '@shared/service-proxies/service-proxies';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-training-class-category',
  templateUrl: './create-or-update-training-class-category.component.html',

})
export class CreateOrUpdateTrainingClassCategoryComponent implements OnInit {

   //#region variable
   createOrUpdateForm: FormGroup;
   classCategoryList: TrainingClassCategoryViewModel[] = [];
   productList:ProductViewModel[] = []
   //#endregion
 
   //#region input output
   @Output() closeEvent = new EventEmitter();
   @Output() saveEvent = new EventEmitter();
 
   @Input() classCategoryBinding: TrainingClassCategoryViewModel
   //#endregion
 
   //#region contructor
   constructor(private fb: FormBuilder, private classCategoryService: TrainingClassCategoryServiceProxy, private productService : ProductServiceProxy) {
     this.createOrUpdateForm = this.fb.group({
       name: ['', [Validators.required]],
       description: ['', [Validators.required]],
       productId: ['', [Validators.required]],
     });
   }
 
   ngOnInit(): void {
     this.getAllClassCategory('');
     this.getAllProduct('');
   }
   //#endregion
 
   //#region validate
  
   //#endregion
 
   //#region function
   submitForm(value: CreateOrUpdateTrainingClassCategoryRequest): void {
     for (const key in this.createOrUpdateForm.controls) {
       this.createOrUpdateForm.controls[key].markAsDirty();
       this.createOrUpdateForm.controls[key].updateValueAndValidity();
     }
     this.saveEvent.emit();
 
     console.log(value)
     this.createOrUpdateClassCategory(value)
   }
 
   closeForm() {
     this.closeEvent.emit();
 
   }

   getAllProduct(keyword: string) {
    this.productService.getAllProduct(keyword).subscribe(x => this.productList = x);
  }
 
   getAllClassCategory(keyword: string) {
     this.classCategoryService.getAllTrainingClassCategory(keyword).subscribe(x => this.classCategoryList = x);
 
   }
 
   createOrUpdateClassCategory(request: CreateOrUpdateTrainingClassCategoryRequest) {
     if (this.classCategoryBinding != undefined) {
       request.id = this.classCategoryBinding.id
     }
     request.name = this.createOrUpdateForm.value.name;
     request.description = this.createOrUpdateForm.value.description;
     this.classCategoryService.createOrUpdateTrainingClassCategory(request).subscribe();
   }
   //#endregion

}
