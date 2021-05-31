import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateOrUpdateOptionRequest, OptionServiceProxy, OptionViewModel } from '@shared/service-proxies/service-proxies';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-or-update-option',
  templateUrl: './create-or-update-option.component.html',

})
export class CreateOrUpdateOptionComponent implements OnInit {

  //#region variable
  createOrUpdateForm: FormGroup;
  optionList: OptionViewModel[] = [];
  //#endregion

  //#region input output
  @Output() closeEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  @Input() optionBinding: OptionViewModel
  //#endregion

  //#region contructor
  constructor(private fb: FormBuilder, private optionService: OptionServiceProxy) {
    this.createOrUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      unit: ['Tháng', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllOption('');
  }
  //#endregion

  //#region validate
 
  //#endregion

  //#region function
  submitForm(value: CreateOrUpdateOptionRequest): void {
    for (const key in this.createOrUpdateForm.controls) {
      this.createOrUpdateForm.controls[key].markAsDirty();
      this.createOrUpdateForm.controls[key].updateValueAndValidity();
    }
    this.saveEvent.emit();
    this.createOrUpdateOption(value)
  }

  closeForm() {
    this.closeEvent.emit();

  }

  getAllOption(keyword: string) {
    this.optionService.getAllOption(keyword).subscribe(x => this.optionList = x);
  }

  createOrUpdateOption(request: CreateOrUpdateOptionRequest) {
    if (this.optionBinding != undefined) {
      request.id = this.optionBinding.id
    }
    this.optionService.createOrUpdateOption(request).subscribe();
  }
  //#endregion
}
