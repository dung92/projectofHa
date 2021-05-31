import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdatePositionRequest, PositionServiceProxy, PositionViewModel } from '@shared/service-proxies/service-proxies';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-position',
  templateUrl: './create-or-update-position.component.html',
})
export class CreateOrupdatePositionComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  positionList: PositionViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() positionBinding: PositionViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private positionService: PositionServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      baseSalary: ['', [Validators.required]],
      bonus: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllPosition('');
  }
  //#endregion

  //#region validate
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdatePositionRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();

    console.log(value)
    this.createOrUpdatePosition(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }

  getAllPosition(keyword: string) {
    this.positionService.getAllPosition(keyword).subscribe(x => this.positionList = x);

  }

  createOrUpdatePosition(request: CreateOrUpdatePositionRequest) {
    if (this.positionBinding != undefined) {
      request.id = this.positionBinding.id
    }
  
    this.positionService.createOrUpdatePosition(request).subscribe();
  }
  //#endregion

}
