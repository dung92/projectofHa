import { Component, OnInit } from '@angular/core';
import { ServiceServiceProxy, ServiceViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  serviceList : ServiceViewModel[] = [];
  serviceListFilter : ServiceViewModel;
  //#endregion

  //#region contructor life cycle hook
  constructor(private serviceService : ServiceServiceProxy) { }

  ngOnInit(): void {
    this.getAllService('');
  }
  //#endregion
 
  //#region function
  showModal(id? : number): void {
    if(id != undefined)
    {
      this.serviceListFilter = this.serviceList.find(x => x.id == id);
    }
    this.isVisible = true;

  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.serviceListFilter = undefined
    this.getAllService('');
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.serviceListFilter = undefined
  }
  
  getAllService(keyword : string)
  {
    this.serviceService.getAllService(keyword).subscribe(x => this.serviceList = x);
  }

  deleteService(id : number)
  {
    this.serviceService.deleteService(id).subscribe();
    this.getAllService('');
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
