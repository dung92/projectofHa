import { Component, OnInit } from '@angular/core';
import { PositionServiceProxy, PositionViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
})
export class PositionComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  positionList: PositionViewModel[] = [];
  positionListFilter: PositionViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private positionService: PositionServiceProxy) { }

  ngOnInit(): void {
    this.getAllPosition('');
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.positionListFilter = this.positionList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.positionListFilter = undefined

    this.getAllPosition('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.positionListFilter = undefined
  }

  getAllPosition(keyword: string) {
    this.positionService.getAllPosition(keyword).subscribe(x => this.positionList = x);
  }

  deletePosition(id: number) {

    this.positionService.deletePosition(id).subscribe();
    this.getAllPosition('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
