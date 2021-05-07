import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'beautifyString' })
export class BeautifyStringPipe implements PipeTransform {

    transform(str: any): any {
        if (str && typeof(str) === 'string') {
            const arr = str.replace(/_/g, ' ').toLowerCase().split(' ');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
            }
            return arr.join(' ');
        }
        return '';
    }

}
