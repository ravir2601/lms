import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from './session.service';

@Injectable({
    providedIn: 'root'
})
export class HttpManagerService {

    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService
    ) {
    }

    get(url: string) {
        return this.httpClient.get(url,
            {
                headers: new HttpHeaders()
                    .set('Authorization', this.sessionService.getSessionId())
            });
    }

    post(url, body) {
        return this.httpClient.post(url, body,
            {
                headers: new HttpHeaders()
                    .set('Authorization', this.sessionService.getSessionId())
            });
    }

    postWithoutHeader(url, body) {
        return this.httpClient.post(url, body);
    }

    put(url, body) {
        return this.httpClient.put(url, body,
            {
                headers: new HttpHeaders()
                    .set('Authorization', this.sessionService.getSessionId())
            });
    }

    delete(url: string) {
        return this.httpClient.get(url,
            {
                headers: new HttpHeaders()
                    .set('Authorization', this.sessionService.getSessionId())
            });
    }

    patch(url, body) {
        return this.httpClient.patch(url, body,
            {
                headers: new HttpHeaders()
                    .set('Authorization', this.sessionService.getSessionId())
            });
    }

}
