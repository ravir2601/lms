import { LMS_URLS } from './../constants/static-urls';
import { HttpManagerService } from './http-manager.service';
import { environment } from './../../environments/environment';
import { ERROR_KEY } from './../constants/error-message';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    flattenConstantsMap = {};

    constructor(
        private snackBar: MatSnackBar,
        private httpManagerService: HttpManagerService,
        private httpClient: HttpClient
    ) { }

    public sidenav: MatSidenav;

    objectify(data, key = 'key', removeKey = false) {
        const temp = {};
        data.forEach(row => {
            const index = row[key];
            if (removeKey) {
                delete (row[key]);
            }
            temp[index] = row;
        });
        return temp;
    }

    filterSafe(data, safeArray) {
        const temp = {};
        Object.entries(data).forEach(
            ([key, value]) => {
                if (safeArray.indexOf(key) !== -1) {
                    temp[key] = value;
                }
            }
        );
        return temp;
    }

    parseDate(date) {
        if (!date) {
            return null;
        }
        const temp = new Date(date);
        return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
    }

    showToast(message: string, type: string) {
        this.snackBar.open(message, null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 3000,
            panelClass: [type, 'alert']
        });
    }

    showError(message: string) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: message,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-brand',
                cancelButton: 'btn btn-secondary'
            }
        });
    }

    showSuccess(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Voila!',
            text: message,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-brand',
                cancelButton: 'btn btn-secondary'
            }
        });
    }

    confirm(message, callback, btnText = 'Yes') {
        Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: btnText,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-brand',
                cancelButton: 'btn btn-secondary'
            }
        }).then((result) => {
            if (result.value) {
                callback();
            }
        })
    }

    copyToClipboard(event, data) {
        const el = document.createElement('textarea');
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    setFlattenConstantsMap(data) {
        data.forEach(el => {
            this.flattenConstantsMap[el.value] = el.name;
        });
    }

    getBusinessData(userId) {
        const url =
            environment.api_host +
            LMS_URLS.bussiness_details +
            userId +
            '/';
        return this.httpManagerService.get(url);
    }

    getBusinessAddress(userId) {
        const url =
            environment.api_host +
            LMS_URLS.bussiness_details +
            userId +
            '/addresses/';
        return this.httpManagerService.get(url);
    }

    getPersonDetails(userId) {
        const url =
            environment.api_host +
            LMS_URLS.bussiness_details +
            userId +
            '/persons/';
        return this.httpManagerService.get(url);
    }

    getUserDetails(url): Observable<any> {
        const expand = [
            'mobile',
        ].join(',');
        const params = new HttpParams().set('expand', expand);
        return this.httpClient.get(url, {
            params
        });
    }

    logEvent(category: any, action: any, label: any, value = 1): void {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value
        });
    }
}
