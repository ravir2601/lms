import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })

export class ReplacePipe implements PipeTransform {
    str = '[a-zA-z0-9]';

    transform(value: string): any {
        const regex = new RegExp(this.str, 'g');
        return value.replace(regex, '*');
    }

}
