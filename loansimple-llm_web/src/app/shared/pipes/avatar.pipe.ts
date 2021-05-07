import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({ name: 'avatar' })
export class AvatarPipe implements PipeTransform {

    transform(url: any, str: any): any {
        return url || environment.assets_root_host + '/placeholders/avatars/' + str[0].toLowerCase() + '.png';
    }

}
