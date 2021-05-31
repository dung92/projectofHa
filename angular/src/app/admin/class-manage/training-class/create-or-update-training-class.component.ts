import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateTrainingClassRequest, TrainingClassCategoryServiceProxy, TrainingClassCategoryViewModel, TrainingClassServiceProxy, TrainingClassViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-training-class',
  templateUrl: './create-or-update-training-class.component.html',
})
export class CreateOrUpdateTrainingClassComponent implements OnInit {

   //#region variable
   createOrUpdateForm: FormGroup;
   classList: TrainingClassViewModel[] = [];
   classCategoryList: TrainingClassCategoryViewModel[] = [];
   //#endregion
 
   //#region input output
   @Output() closeEvent = new EventEmitter();
   @Output() saveEvent = new EventEmitter();
 
   @Input() classBinding: TrainingClassViewModel
   //#endregion
 
   //#region contructor
   constructor(private fb: FormBuilder, private classService: TrainingClassServiceProxy, private classCategoryService: TrainingClassCategoryServiceProxy) {
     this.createOrUpdateForm = this.fb.group({
       name: ['', [Validators.required]],
       trainingClassCategoryId: ['', [Validators.required]],
     });
   }
 
   ngOnInit(): void {
     this.getAllClass('');
     this.getAllClassCategory('')
   }
   //#endregion
 
   //#region validate
  
   //#endregion
 
   //#region function
   submitForm(value: CreateOrUpdateTrainingClassRequest): void {
     for (const key in this.createOrUpdateForm.controls) {
       this.createOrUpdateForm.controls[key].markAsDirty();
       this.createOrUpdateForm.controls[key].updateValueAndValidity();
     }
     this.saveEvent.emit();
 
     console.log(value)
     this.createOrUpdateClass(value)
   }
 
   closeForm() {
     this.closeEvent.emit();
 
   }
 
   getAllClass(keyword: string) {
     this.classService.getAllTrainingClass(keyword).subscribe(x => this.classList = x);
 
   }
   getAllClassCategory(keyword: string) {
    this.classCategoryService.getAllTrainingClassCategory(keyword).subscribe(x => this.classCategoryList = x);
  }
 
   createOrUpdateClass(request: CreateOrUpdateTrainingClassRequest) {
     if (this.classBinding != undefined) {
       request.id = this.classBinding.id
     }
     this.classService.createOrUpdateTrainingClass(request).subscribe();
   }
   //#endregion

}
