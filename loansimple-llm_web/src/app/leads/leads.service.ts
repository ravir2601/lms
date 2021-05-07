import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LEADS_URLS } from '../constants/static-urls';
import { Business } from '../core/_models/business.model';
import { ListOptions } from '../core/_models/list-options.model';
import { Reminder } from '../core/_models/reminder.model';
import { HttpManagerService } from '../services/http-manager.service';
import { ListResponse } from '../shared/list-response.interface';
import { Badges } from '../applications/application-list/badges.model';
import { Notifications } from '../views/partials/layout/topbar/notification/notification-list.interface';
import { Log } from "../core/_models/log.model";

@Injectable()
export class LeadsService {
    error: any;
    root = environment.api_host;

    constructor(
        private httpManagerService: HttpManagerService,
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    getLeads(tab, options: ListOptions): Observable<ListResponse<Business[]>> {
        let params = new HttpParams().set('tab', tab);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<Business[]>>(this.root + LEADS_URLS.businesses, {
            params
        });
    }

    getBadges(options: ListOptions) {
        const except = ['page', 'page_size '];
        let params = new HttpParams().set('badges', 'true');
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<Badges>(this.root + LEADS_URLS.businesses, {
            params
        });
    }

    addLead(lead): Observable<any> {
        const url = environment.api_host + LEADS_URLS.leadList;
        return this.httpManagerService.post(url, { ...lead });
    }

    addReminder(url, data): Observable<any> {
        url += 'reminders/';
        return this.httpClient.post<Reminder>(url, data);
    }

    addLog(url, data): Observable<any> {
        url += 'comments/';
        return this.httpClient.post<Log>(url, data);
    }

    updateLeadReminder(lead, url): Observable<any> {
        return this.httpManagerService.patch(url, { ...lead });
    }

    getReminders(url?): Observable<Notifications<Business[]>> {
        if (url) {
            return this.httpClient.get<Notifications<Business[]>>(url);
        } else {
            return this.httpClient.get<Notifications<Business[]>>(this.root + LEADS_URLS.reminderList, {
                params: new HttpParams().set('is_completed', 'false')
            });
        }
    }

    verifyOtp(lead): Observable<any> {
        const url = environment.api_host + LEADS_URLS.otpVerification;
        return this.httpManagerService.post(url, { ...lead });
    }

    getLeadSource() {
        const url = environment.api_host + LEADS_URLS.leadSource;
        return this.httpManagerService.get(url);
    }

    getCity() {
        const url = environment.api_host + LEADS_URLS.cities;
        return this.httpManagerService.get(url + '?type=' + 'city' + '&is_approved=' + 'true');
    }

    getLeadSummary(leadId) {
        const url = environment.api_host + LEADS_URLS.businesses + leadId + '/summary/';
        return this.httpManagerService.get(url);
    }

    transferLead(id): Observable<any> {
        const url = environment.api_host + LEADS_URLS.leadTransfer + id + '/transfer/';
        return this.httpManagerService.patch(url, {});
    }

    getCrmConstants() {
        const url = environment.api_host + LEADS_URLS.crmConstants;
        return this.httpManagerService.get(url);
    }

    getUserList() {
        const url = environment.api_host + LEADS_URLS.user + '?fields=display_name,id';
        return this.httpManagerService.get(url);
    }
    getNextPageData(url): Observable<any> {
        return this.httpManagerService.get(url);
    }

}
