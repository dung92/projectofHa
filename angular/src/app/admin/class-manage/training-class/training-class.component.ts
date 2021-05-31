import { Component, OnInit } from '@angular/core';
import { TrainingClassServiceProxy, TrainingClassViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-training-class',
  templateUrl: './training-class.component.html',

})
export class TrainingClassComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  classList: TrainingClassViewModel[] = [];
  classListFilter: TrainingClassViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private classService: TrainingClassServiceProxy) { }

  ngOnInit(): void {
    this.getAllClass('');
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.classListFilter = this.classList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.classListFilter = undefined

    this.getAllClass('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.classListFilter = undefined
  }

  getAllClass(keyword: string) {
    this.classService.getAllTrainingClass(keyword).subscribe(x => this.classList = x);
  }

  deleteClass(id: number) {

    this.classService.deleteTrainingClass(id).subscribe();
    this.getAllClass('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
