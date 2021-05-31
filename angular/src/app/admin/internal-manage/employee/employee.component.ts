import { Component, OnInit } from '@angular/core';
import { EmployeeServiceProxy, EmployeeViewModel, PositionServiceProxy, PositionViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class EmployeeComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;
  positionList : PositionViewModel[]=[];

  employeeList: EmployeeViewModel[] = [];
  employeeListFilter: EmployeeViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private employeeService: EmployeeServiceProxy, private positionService: PositionServiceProxy) { }

  ngOnInit(): void {
    this.getAllEmployee('');
    this.getAllPosition();
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.employeeListFilter = this.employeeList.find(x => x.id == id);
    }
    this.isVisible = true;
    console.log(this.employeeList)
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.employeeListFilter = undefined

    this.getAllEmployee('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.employeeListFilter = undefined
  }

  getAllEmployee(keyword: string) {
    this.employeeService.getAllEmployee(keyword).subscribe(x => this.employeeList = x);
  }

  getAllPosition()
  {
    this.positionService.getAllPosition('').subscribe(x => this.positionList =x)
  }

  deleteEmployee(id: number) {

    this.employeeService.deleteEmployee(id).subscribe();
    this.getAllEmployee('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  date = null;
}
