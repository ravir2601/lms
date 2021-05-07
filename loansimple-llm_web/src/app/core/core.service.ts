import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LEADS_URLS } from '../constants/static-urls';
import { ListResponse } from '../shared/list-response.interface';
import { CORE_URLS } from './../constants/static-urls';
import { Activity } from './_models/activity.model';
import { Address } from './_models/address.model';
import { Bank } from './_models/bank.model';
import { Business } from './_models/business.model';
import { Contact } from './_models/contact.model';
import { Document } from './_models/document.model';
import { Extra } from './_models/extra.model';
import { Issue } from './_models/issue.model';
import { OtherContact } from './_models/other-contact.model';
import { BusinessPerson, Person } from './_models/person.model';
import { Photo } from './_models/photo.model';

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    routeParams: any;
    root = environment.api_host;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    getBusiness(id) {
        const expand = [
            'business_vertical',
            'addresses',
            'primary_person.person',
            'extra.case_owner'
        ].join(',');
        const fields = [
            'business_id',
            'name',
            'profile_photo',
            'business_type',
            'business_vertical',
            'primary_person.person.full_name',
            'addresses.city',
            'addresses.state',
            'extra.source',
            'extra.loan_type',
            'extra.product_type',
            'extra.case_owner.full_name',
            'extra.status',
            'update_url',
        ].join(',');
        return this.httpClient.get<Business>(this.root + LEADS_URLS.businesses + id + '/', {
            params: new HttpParams().set('expand', expand)
                .set('fields', fields)
        });
    }

    getBusinessExtra(id, filter = []) {
        let options = {};
        if (filter.length) {
            options = {
                params: new HttpParams().set('key', filter.join(','))
            };
        }
        return this.httpClient.get<ListResponse<Extra[]>>(this.root + LEADS_URLS.businesses + id + CORE_URLS.extra, options);
    }

    getPersonExtra(url): Observable<Person> {
        return this.httpClient.get<Person>(url + '?expand=common_data');
    }

    getBusinessActivities(url, type) {
        return this.httpClient.get<ListResponse<Activity[]>>(url + 'activities/', {
            params: new HttpParams().set('expand', 'user')
                .set('type_in', type)
                .set('page_size', '50')
        });
    }

    getBusinessPersons(businessId) {
        const expand = [
            'person.pan_card',
            'person.primary_mobile',
            'person.aadhaar_card',
            'person.primary_email',
            'person.common_data'
        ].join(',');
        return this.httpClient.get<ListResponse<BusinessPerson[]>>(this.root + LEADS_URLS.businesses + businessId + '/persons/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    saveBusinessPerson(url, data): Observable<BusinessPerson> {
        return this.httpClient.patch<BusinessPerson>(url, data);
    }

    createBusinessPerson(businessId, data): Observable<BusinessPerson> {
        return this.httpClient.post<BusinessPerson>(this.root + LEADS_URLS.businesses + businessId + '/persons/', data);
    }

    getBusinessPhotos(businessId) {
        const expand = [
            'doc_issues.raised_by',
            'doc_issues.assigned_to',
            'doc_histories.created_by'
        ].join(',');
        return this.httpClient.get<ListResponse<Photo[]>>(this.root + LEADS_URLS.businesses + businessId + '/photos/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    uploadBusinessPhotos(businessId, tag, files) {
        const data = new FormData();
        files.forEach(file => {
            data.append('files', file);
        });
        data.append('tag', tag);
        return this.httpClient.post<Photo[]>(this.root + LEADS_URLS.businesses + businessId + '/photos/', data);
    }

    getPerson(personUrl) {
        return this.httpClient.get<Person>(personUrl);
    }

    savePerson(personUrl, data): Observable<Person> {
        return this.httpClient.patch<Person>(personUrl, data);
    }

    getPersonPhotos(url) {
        return this.httpClient.get<ListResponse<Photo[]>>(url + CORE_URLS.photos);
    }

    uploadPersonPhoto(url, tag, files, method) {
        const data = new FormData();
        files.forEach(file => {
            data.append('files', file);
        });
        data.append('tag', tag);
        return this.httpClient[method]<Photo[]>(url, data);
    }

    getAddresses(url) {
        const expand = [
            'doc_issues.raised_by',
            'doc_issues.assigned_to',
            'doc_histories.created_by',
            'common_data',
        ].join(',');
        return this.httpClient.get<ListResponse<Address[]>>(url + 'addresses/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    createAddress(url, data): Observable<Address> {
        return this.httpClient.post<Address>(url, data);
    }

    updateAddress(url, data): Observable<Address> {
        return this.httpClient.patch<Address>(url, data);
    }

    getDocuments(url, expand = true, doc_type = '') {
        let params = new HttpParams();
        if (expand) {
            params = params.set('expand', [
                'doc_issues.raised_by',
                'doc_issues.assigned_to',
                'doc_histories.created_by'
            ].join(','));
        }
        if (doc_type) {
            params = params.set('doc_type', doc_type);
        }
        return this.httpClient.get<ListResponse<Document[]>>(url + 'documents/', { params });
    }

    uploadDocument(url, data, files, method) {
        const temp = new FormData();
        files.forEach(file => {
            temp.append('files', file);
        });
        Object.entries(data).forEach(([key, value]) => {
            temp.append(key, value.toString());
        });
        return this.httpClient[method]<Document>(url, temp);
    }

    updateDocument(url, data) {
        return this.httpClient.patch<Document>(url, data);
    }

    createIssue(url, data) {
        return this.httpClient.put<Issue>(url + 'mark_issue/', data);
    }

    updateIssue(url, data) {
        return this.httpClient.patch<Issue>(url, data);
    }

    getContacts(personUrl, type) {
        return this.httpClient.get(personUrl + 'contact_details/', {
            params: new HttpParams().set('type', type)
        });
    }

    addContacts(personUrl, data) {
        return this.httpClient.post<Contact>(personUrl + 'contact_details/', data);
    }

    updateContact(updateUrl, data) {
        return this.httpClient.patch(updateUrl, data);
    }

    getOtherContacts(personUrl, type) {
        return this.httpClient.get<ListResponse<OtherContact[]>>(personUrl + 'other_contacts/', {
            params: new HttpParams().set('type', type)
        });
    }

    saveOtherContact(url, data, method) {
        return this.httpClient[method]<OtherContact>(url, data);
    }

    getBusinessDetails(businessId) {
        return this.httpClient.get(this.root + LEADS_URLS.businesses + businessId + '/');
    }

    updateBusinessDetails(businessUrl, details) {
        return this.httpClient.patch(businessUrl, details);
    }

    getBankByIFSC(ifsc) {
        return this.httpClient.get(this.root + CORE_URLS.ifsc + '?code=' + ifsc);
    }

    addBank(businessId, bank) {
        return this.httpClient.post(this.root + CORE_URLS.businessList + businessId + '/banks/', bank);
    }

    getBanks(businessId): Observable<ListResponse<Bank[]>> {
        return this.httpClient.get<ListResponse<Bank[]>>(this.root + CORE_URLS.businessList + businessId + '/banks/');
    }

    updateBank(url, data) {
        return this.httpClient.patch<Bank>(url, data);
    }

    getBankStatement(bankUrl) {
        const expand = [
            'doc_issues.raised_by',
            'doc_issues.assigned_to',
            'doc_histories.created_by'
        ].join(',');
        return this.httpClient.get(bankUrl + 'bank_statements/', {
            params: new HttpParams().set('expand', expand)
        });
    }

    addBankStatement(bankUrl, data, files) {
        const temp = new FormData();
        files.forEach(file => {
            temp.append('files', file);
        });

        Object.entries(data).forEach(([key, value]) => {
            if(value) {
                temp.append(key, value.toString());
            }
        });
        return this.httpClient.post(bankUrl + 'bank_statements/', temp);
    }

    getBankDocs(url) {
        const expand = [
            'doc_issues.raised_by',
            'doc_issues.assigned_to',
            'doc_histories.created_by'
        ].join(',');
        return this.httpClient.get(url, {
            params: new HttpParams().set('expand', expand)
        });
    }

    uploadBankDocs(url, data, files) {
        const temp = new FormData();
        files.forEach(file => {
            temp.append('files', file);
        });

        Object.entries(data).forEach(([key, value]) => {
            temp.append(key, value.toString());
        });
        return this.httpClient.patch<Bank>(url, temp);
    }

    delete(url) {
        return this.httpClient.delete(url);
    }

}



// TODO: Fetch Basic Details on PAN upload
// TODO: use application_id from array of application on lead save response
// TODO: aadhaar_parsed_data is not working, re-fetch on aadhaar upload