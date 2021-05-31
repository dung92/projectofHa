import { Component, OnInit } from '@angular/core';
import { SessionWorkServiceProxy, SessionWorkViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-session-work',
  templateUrl: './session-work.component.html',

})
export class SessionWorkComponent implements OnInit {

  //#region variable
  isVisible = false;
  isConfirmLoading = false;

  sessionList: SessionWorkViewModel[] = [];
  sessionListFilter: SessionWorkViewModel;
  //#endregion

  //#region contructor lify cycle hook
  constructor(private sessionService: SessionWorkServiceProxy) { }

  ngOnInit(): void {
    this.getAllSession('');
  }
  //#endregion
  
  //#region funtion
  showModal(id?: number): void {
    if (id != undefined) {
      this.sessionListFilter = this.sessionList.find(x => x.id == id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);

    this.sessionListFilter = undefined

    this.getAllSession('')
    setTimeout(() => {
      location.reload();
    }, 500);
    
  }

  handleCancel(): void {
    this.isVisible = false;
    this.sessionListFilter = undefined
  }

  getAllSession(keyword: string) {
    this.sessionService.getAllSessionWork(keyword).subscribe(x => this.sessionList = x);
  }

  deleteSession(id: number) {

    this.sessionService.deleteSessionWork(id).subscribe();
    this.getAllSession('')
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  //#endregion

}
