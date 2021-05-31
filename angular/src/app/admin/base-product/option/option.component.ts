import { Component, OnInit } from '@angular/core';
import { OptionServiceProxy, OptionViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
})
export class OptionComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  optionList: OptionViewModel[] = [];
  optionListFilter: OptionViewModel;
  //#endregion

  //#region contructor
  constructor(private optiontService: OptionServiceProxy) { }

  ngOnInit(): void {
    this.getAllOption('');
  }
  //#endregion

  //#region function
  showModal(id?: number): void {
    if (id != undefined) {
      this.optionListFilter = this.optionList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.getAllOption('')

    this.optionListFilter = undefined
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;

    this.optionListFilter = undefined
  }

  getAllOption(keyword: string) {
    this.optiontService.getAllOption(keyword).subscribe(x => this.optionList = x);
  }

  deleteOption(id: number) {
    this.optiontService.deleteOption(id).subscribe();
    this.getAllOption('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion
}
