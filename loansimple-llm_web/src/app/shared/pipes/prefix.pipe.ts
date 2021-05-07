import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'prefix'
})
export class PrefixPipe implements PipeTransform {

    transform(value: any, prefix: any): any {
        return value ? (prefix ? prefix + ' ' + value : value) : '';
    }

}
