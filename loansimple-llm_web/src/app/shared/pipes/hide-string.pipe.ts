import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hideString'
})
export class HideStringPipe implements PipeTransform {

    transform(value: any): any {
        let str = '';
        if (value) {
            for (let i = 0; i < value.length; i++) {
                if (i < value.length - 4) {
                  str = str + '*';
                } else {
                  str = str + value.charAt(i);
                }
              }
            return str;
        } else { return '-'; }

      }
}
