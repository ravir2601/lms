// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from '../../../../services/session.service';
import { CommonService } from '../../../../services/common.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

    constructor(
        private sessionService: SessionService,
        private commonService: CommonService
    ) {

    }

    // intercept request and add token
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // tslint:disable-next-line:no-debugger
        // modify request
        request = request.clone({
            setHeaders: {
                Authorization: this.sessionService.getSessionId(),
                'X-APP-NAME': 'llm',
                'X-APP-PLATFORM': 'browser',
            }
        });
        const user = this.sessionService.getUserDetails();
        if (['POST', 'PATCH', 'PUT', 'DELETE'].indexOf(request.method.toUpperCase()) !== -1 && user) {
            this.commonService.logEvent(user['user']['full_name'], request.url, JSON.stringify(request.body));
        }
        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                    }
                },
                error => {
                    if (error.status === 401 || error.status === 403) {
                        return this.sessionService.logout();
                    } else if (error.status === 400) {
                        const keys = Object.keys(error.error);
                        if (keys[0] === 'message') {
                            this.commonService.showError(error.error[keys[0]]);
                        } else if (typeof (error.error[keys[0]]) === 'object') {
                            this.commonService.showError(keys[0] + ': ' + error.error[keys[0]][0]);
                        }
                    } else if (error.status === 404) {
                        this.commonService.showError('This request can not be completed, please contact Tech @ LoanSimple.');
                    } else if (error.status === 500) {
                        this.commonService.showError('Server Error, please try again later. ' +
                        'If the issue persists, contact Tech @ LoanSimple.');
                    } else if (error.message ) {
                        this.commonService.showError(error.message);
                    }
                }
            )
        );
    }
}
