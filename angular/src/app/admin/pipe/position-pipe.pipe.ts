import {  Pipe, PipeTransform } from '@angular/core';
import {  PositionViewModel } from '@shared/service-proxies/service-proxies';

@Pipe({
  name: 'positionPipe'
})
export class PositionPipePipe implements PipeTransform {

  transform(value: number, data: PositionViewModel[]): string {
    for(let item of data)
    {
      if(value == item.id)
      {
        return item.name
      }
    }
    
  }


}
