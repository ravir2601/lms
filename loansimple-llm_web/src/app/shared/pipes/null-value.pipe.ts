import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nullValue'
})
export class NullValuePipe implements PipeTransform {

    transform(value: any): any {
        if (value === null || value === '') {
            return '-';
        } else {
            return value;
        }
    }
}
