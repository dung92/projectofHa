import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateServiceRequest, ServiceServiceProxy, ServiceViewModel } from '@shared/service-proxies/service-proxies';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-service',
  templateUrl: './create-or-update-service.component.html',
})
export class CreateOrUpdateServiceComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  serviceList: ServiceViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Input() serviceBinding: ServiceViewModel
  //#endregion

  //#region contructor life cycle hook
  constructor(private fb: FormBuilder, private serviceService: ServiceServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllService('');

  }
  //#endregion

  //#region validate
  
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateServiceRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();
    this.createOrUpdateService(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }



  getAllService(keyword: string) {
    this.serviceService.getAllService(keyword).subscribe(x => this.serviceList = x);
  }

  createOrUpdateService(request: CreateOrUpdateServiceRequest) {
    if (this.serviceBinding != undefined) {
      request.id = this.serviceBinding.id
    }

    request.name = this.createOrUpdateForm.value.name;
    request.description = this.createOrUpdateForm.value.description;
    console.log(request)
    this.serviceService.createOrUpdateService(request).subscribe();
  }
  //#endregion
}
