import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'dateTime'})
export class DateTimePipe implements PipeTransform {

    transform(value: any): any {
        const datePipe = new DatePipe('en-IN');
        return datePipe.transform(value, 'HH:mm, dd MMM yy');
    }
}
