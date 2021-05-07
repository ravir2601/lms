import { Injectable } from '@angular/core';
import { ListOptions } from '../core/_models/list-options.model';
import { Observable } from 'rxjs';
import { ListResponse } from '../shared/list-response.interface';
import { Application, ApplicationExtra } from './_models/application.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LOS_URLS } from "../constants/static-urls";
import { environment } from '../../environments/environment';
import { Financial } from './_models/financial.model';
import { IncomeSource } from './_models/income-source.model';
import { RunningLoan } from './_models/running-loan.model';
import { LoanData } from './_models/loan-data.model';
import { Income } from './_models/income.model';
import { OnboardingCallCheck } from './_models/onboarding-call-check';
import { State } from './_models/state.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService {
    root = environment.api_host;

    constructor(
        private httpClient: HttpClient
    ) { }

    getApplications(tab, options: ListOptions): Observable<ListResponse<Application[]>> {
        const expand = [
            'business.extra.case_owner',
            'business.extra.territory_owner',
            'business.primary_person.person.primary_mobile',
            'state'
        ].join(',');
        let params = new HttpParams().set('tab', tab)
            .set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<Application[]>>(this.root + LOS_URLS.applications, {
            params
        });
    }

    getApplication(id) {
        const expand = [
            'business',
            'state',
            'business.primary_person.person',
            'business.extra.case_owner',
            'business.business_vertical',
            'business.addresses',
        ].join(',');
        const fields = [

        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/', {
            params: new HttpParams().set('expand', expand)
            // .set('fields', fields)
        });
    }
    getExtraDocuments(id) {
        const expand = [
            'raised_by','uploaded_by','attachments'
        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/extra_docs/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    getLosConstants() {
        return this.httpClient.get(this.root + LOS_URLS.constants, {
            });
    }

    addExtraDocRequired(payload, formData) {
        const url = this.root + LOS_URLS.applications + `${payload.id}/extra_docs/`;
        return this.httpClient.post(url, formData);
    }

    saveApplication(url: string, data): Observable<Application> {
        return this.httpClient.patch<Application>(url, data);
    }

    getUnderwritingInfo(id: number) {
        const expand = [
            'business.running_loans',
            'business.financial.categories',
            'business.persons.person.financial',
            'extra'
        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    getUnderwritingSummary(id: number) {
        const expand = [
            'business.financial.categories',
            'business.persons.person.financial',
        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    getOnboardingCallInfo(id: number) {
        const expand = [
            'onboarding_call',
            'onboarding_call_checks',
            'business.persons.person'
        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    getLoanData(id: number) {
        const expand = [
            'loan_data',
        ].join(',');
        return this.httpClient.get<Application>(this.root + LOS_URLS.applications + id + '/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    createFinancial(url, data): Observable<Financial> {
        return this.httpClient.post<Financial>(url, data);
    }

    updateFinancial(url, data): Observable<Financial> {
        return this.httpClient.patch<Financial>(url, data);
    }

    getIncomeSources(url): Observable<ListResponse<IncomeSource[]>> {
        url += LOS_URLS.incomeSources;
        return this.httpClient.get<ListResponse<IncomeSource[]>>(url);
    }

    saveIncomeSource(url, data, method): Observable<IncomeSource> {
        return this.httpClient[method]<IncomeSource>(url, data);
    }

    getRunningLoans(url): Observable<ListResponse<RunningLoan[]>> {
        url += LOS_URLS.runningLoans;
        return this.httpClient.get<ListResponse<RunningLoan[]>>(url);
    }

    saveRunningLoan(url, data, method): Observable<RunningLoan> {
        return this.httpClient[method]<RunningLoan>(url, data);
    }

    saveExtra(url, data, file = null): Observable<ApplicationExtra> {
        const temp = new FormData();
        temp.append('pd_file', file);
        Object.entries(data).forEach(([key, value]) => {
            temp.append(key, value.toString());
        });
        return this.httpClient.patch<ApplicationExtra>(url, temp);
    }

    saveLoanData(url, data): Observable<LoanData> {
        return this.httpClient.patch<LoanData>(url, data);
    }

    createBusinessIncome(url, data): Observable<Income> {
        url += LOS_URLS.business_categories;
        return this.httpClient.post<Income>(url, data);
    }

    updateBusinessIncome(url, data): Observable<Income> {
        return this.httpClient.patch<Income>(url, data);
    }

    updateOnboardingCallCheck(url, data) {
        return this.httpClient.patch<OnboardingCallCheck>(url, data);
    }

    updateApplicationState(url, data): Observable<State> {
        return this.httpClient.patch<State>(url, data);
    }
}

