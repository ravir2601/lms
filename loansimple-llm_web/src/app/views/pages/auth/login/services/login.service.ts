import {Injectable} from '@angular/core';
import {HttpManagerService} from '../../../../../services/http-manager.service';
import {environment} from '../../../../../../environments/environment';
import {LOGIN_URLS} from '../../../../../constants/static-urls';

@Injectable()
export class LoginService {

    constructor(private httpManagerService: HttpManagerService) {
    }

    login(email, password) {
        const url = environment.api_host + LOGIN_URLS.auth;
        const body = {
            username: email,
            password,
            app_name: 'web',
        };
        return this.httpManagerService.postWithoutHeader(url, body);
    }

    gmailLogin(accessToken) {
        const url = environment.api_host + LOGIN_URLS.googleAuth;
        const body = {
            access_token: accessToken,
            app_name: 'web',
        };
        return this.httpManagerService.postWithoutHeader(url, body);
    }
}
