import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

    transform(value: any): any {
        if (value) {
            return value.replace(/[/_/]/g, ' ').toUpperCase();
        }
    }
}
