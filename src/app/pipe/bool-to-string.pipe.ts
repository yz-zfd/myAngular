import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToString'
})
export class BoolToStringPipe implements PipeTransform {

  transform(value: any): any {
    var marital_statusl;
    if (value){
      marital_statusl="已婚"
    }else {
      marital_statusl="未婚"
    }
    return marital_statusl;
  }

}
