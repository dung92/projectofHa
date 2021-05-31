import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrUpdateSessionWork, SessionWorkServiceProxy, SessionWorkViewModel } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-create-or-update-session-work',
  templateUrl: './create-or-update-session-work.component.html',

})
export class CreateOrUpdateSessionWorkComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  sessionList: SessionWorkViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() sessionBinding: SessionWorkViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private sessionService: SessionWorkServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      fromTime: ['', [Validators.required]],
      toTime: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllSession('');
  }
  //#endregion

  //#region validate
 
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateSessionWork): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();
    this.createOrUpdateSession(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }

  getAllSession(keyword: string) {
    this.sessionService.getAllSessionWork(keyword).subscribe(x => this.sessionList = x);

  }

  createOrUpdateSession(request: CreateOrUpdateSessionWork) {
    if (this.sessionBinding != undefined) {
      request.id = this.sessionBinding.id
    }
    request.fromTime = moment('2021-05-10,'+this.createOrUpdateForm.value.fromTime+':00').subtract(-7,'hours')
    request.toTime = moment('2021-05-10,'+this.createOrUpdateForm.value.toTime+':00').subtract(-7,'hours')
    
    this.sessionService.createOrUpdateSessionWork(request).subscribe();
  }
  //#endregion

}
