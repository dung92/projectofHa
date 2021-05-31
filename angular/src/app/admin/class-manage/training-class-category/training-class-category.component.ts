import { Component, OnInit } from '@angular/core';
import { TrainingClassCategoryServiceProxy, TrainingClassCategoryViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-training-class-category',
  templateUrl: './training-class-category.component.html',

})
export class TrainingClassCategoryComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  classCategoryList: TrainingClassCategoryViewModel[] = [];
  classCategoryListFilter: TrainingClassCategoryViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private classCategoryService: TrainingClassCategoryServiceProxy) { }

  ngOnInit(): void {
    this.getAllClassCategory('');
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.classCategoryListFilter = this.classCategoryList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.classCategoryListFilter = undefined

    this.getAllClassCategory('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.classCategoryListFilter = undefined
  }

  getAllClassCategory(keyword: string) {
    this.classCategoryService.getAllTrainingClassCategory(keyword).subscribe(x => this.classCategoryList = x);
  }

  deleteClassCategory(id: number) {

    this.classCategoryService.deleteTrainingClassCategory(id).subscribe();
    this.getAllClassCategory('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
