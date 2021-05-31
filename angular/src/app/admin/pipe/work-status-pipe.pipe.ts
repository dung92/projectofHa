import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workStatusPipe'
})
export class WorkStatusPipePipe implements PipeTransform {

  transform(value: boolean): string {
    if(value == true)
    {
      return 'Đang làm việc'
    }
    else
    {
      return 'Đã nghỉ việc'
    }
  }

}
