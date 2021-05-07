import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant.service';
import { BeautifyStringPipe } from '../../shared/pipes/beautify-string.pipe';

@Pipe({
    name: 'constant'
})
export class GetConstantPipe implements PipeTransform {

    constructor(private constantService: ConstantService) { }

    transform(value: any): any {
        const beautifyPipe = new BeautifyStringPipe();
        return this.constantService.flatten_constants_subject.value[value] || beautifyPipe.transform(value);
    }
}
