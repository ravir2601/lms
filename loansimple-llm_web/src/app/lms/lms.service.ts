import { Badges } from './../applications/application-list/badges.model';
import { ListOptions } from './../core/_models/list-options.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from './../services/common.service';
import { LMS_URLS, LMS_CONST, UNR_URLS, CORE_URLS } from './../constants/static-urls';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpManagerService } from '../services/http-manager.service';
import { PtpOptionModel } from '../core/_models/ptp-option.model';
import { PtpListModel } from '../core/_models/ptp-list.model';
import { ListResponse } from '../shared/list-response.interface';
import { PTPBadges } from './ptp/badges.model';
import { CashBadges } from './cash/badges.model';
import { CashOption } from '../core/_models/cash-option.model';
import { ChequeOption } from '../core/_models/cheque-option.model';
import { CashList } from '../core/_models/cash-list.model';
import { ChequeList } from '../core/_models/cheque-list.model';
import { NEFTList } from '../core/_models/neft-list.model';
import { NEFTOption } from '../core/_models/neft-option.model';
import { ManualNachRequestedOption } from '../core/_models/manual-nach-requested-option.model';
import { ManualNachDepositedOption } from '../core/_models/manual-nach-deposited-option.model';
import { NachDepositedList } from '../core/_models/nach-deposited-list.model';
import { NachRequestedList } from '../core/_models/nach-requested-list.model';
import { eNachRequestedOption } from '../core/_models/eNach-requested-option.model';
import { eNachDepositedOption } from '../core/_models/eNach-deposited-option.model';
import { PdcList } from '../core/_models/pdc-list.model';
import { PdcOption } from '../core/_models/pdc-option.model';


@Injectable()
export class LmsService {
    root = environment.api_host;
    constructor(
        private httpManagerService: HttpManagerService,
        private commonService: CommonService,
        private httpClient: HttpClient

    ) {
        this.getLmsConstants();
        this.getCoreConstants();
        this.getLmsFlattenConstants();
        this.getFlattenCoreConstant();
        this.getLosConstants();
        this.getFlattenLosConstant();
        // this.getRpcConstants();

        // this.getCorePositionConstants();
        // this.getFlattenCorePositionConstant();
    }

    tempSessionId: string;
    lmsConstants: any;
    coreConstants: any;
    losConstants: any;
    rpcConstants: any;
    routeParams: any;
    error: any;

    filterRequestedData: any = { action: 'select', value: '' };

    private filterList = new BehaviorSubject<any>(this.filterRequestedData);
    currentFilterData = this.filterList.asObservable();

    // common method

    getNextPageData(url, page?, pageSize?, search?): Observable<any> {
        let _page = page ? page : 1;
        let _pageSize = pageSize ? pageSize.toString() : 15;
        let _search = search ? search : '';
        return this.httpManagerService.get(url + '&page=' + _page + '&page_size=' + _pageSize + '&search=' + _search);
    }

    getLmsConstants() {
        const url = environment.api_host + LMS_URLS.lms_constants;
        return this.httpManagerService.get(url).subscribe(res => {
            this.lmsConstants = res;
        });
    }
    getLmsFlattenConstants() {
        const url = environment.api_host + LMS_URLS.lms_constants + '?flatten=True';
        return this.httpManagerService.get(url).subscribe((res: any) => {
            this.commonService.setFlattenConstantsMap(res.items);
        });
    }

    getCoreConstants() {
        const url = environment.api_host + LMS_URLS.core_constants;
        return this.httpManagerService.get(url).subscribe(res => {
            this.coreConstants = res;
        });
    }
    getFlattenCoreConstant() {
        const url = environment.api_host + LMS_URLS.core_constants + '?flatten=True';
        return this.httpManagerService.get(url).subscribe((res: any) => {
            this.commonService.setFlattenConstantsMap(res.items);
        });
    }

    getLosConstants() {
        const url = environment.api_host + LMS_URLS.los_constants;
        return this.httpManagerService.get(url).subscribe(res => {
            this.losConstants = res;
        });
    }
    getFlattenLosConstant() {
        const url = environment.api_host + LMS_URLS.los_constants + '?flatten=True';
        return this.httpManagerService.get(url).subscribe((res: any) => {
            this.commonService.setFlattenConstantsMap(res.items);
        });
    }


    // nach-component

    filterDataList(req: any) {
        this.filterList.next(req);
    }

    uploadNachData(data) {
        const url = environment.api_host + LMS_URLS.nach_deposite;
        return this.httpManagerService.post(url, data);
    }

    get_requested(url) {
        return this.httpManagerService.get(url);
    }

    // end nach-component

    // loan-account-component

    uploadCommentThreadData(url, data: any) {
        const formData: FormData = new FormData();
        formData.append('files', data.file);
        formData.append('text', data.text);
        formData.append('app_name', 'lms');
        return this.httpManagerService.post(url, formData);
    }

    getNBFCData() {
        const url = environment.api_host + LMS_URLS.nbfcData + '?fields=name,id';
        return this.httpManagerService.get(url);
    }

    getFilterData() {
        const url = environment.api_host + UNR_URLS.userData + '?fields=display_name,id';
        return this.httpManagerService.get(url);
    }

    updateRepayment(url, data) {
        return this.httpManagerService.patch(url, data);
    }

    updateCashCheque(url, data) {
        return this.httpManagerService.patch(url, data);
    }

    deletePTP(url): Observable<any> {
        return this.httpClient.delete(url);
    }

    getLoanAccountDetails(url): Observable<any> {
        return this.httpManagerService.get(url);
    }
    getFieldVisitDetails(url): Observable<any> {
        return this.httpManagerService.get(url);
    }
    getPendingPdcsData(loanAccount) {
        const url = environment.api_host + LMS_URLS.loan_accounts + loanAccount + LMS_CONST.pendingPdcs;
        return this.httpManagerService.get(url);
    }

    updatePosSurrender(payload, userId) {
        const url = environment.api_host + LMS_URLS.topups_details + `${userId}/`;
        return this.httpManagerService.patch(url, payload);
    }

    addNeftRequest(payload, userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/repayments/`;
        return this.httpManagerService.post(url, payload);
    }

    addNachRequest(payload, userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/repayments/`;
        return this.httpManagerService.post(url, payload);
    }

    openRepaymentExportList(startDate, endDate, repaymentType, userId) {
        let url = '';
        if (repaymentType) {
            url = environment.api_host + LMS_URLS.loan_accounts
                    + `${userId}${LMS_CONST.repaymentExport}?export=true&start_date=${startDate}&end_date=${endDate}&
                        repayment_type=${repaymentType}`;
        } else {
            url = environment.api_host + LMS_URLS.loan_accounts
                    + `${userId}${LMS_CONST.repaymentExport}?export=true&start_date=${startDate}&end_date=${endDate}`;
        }
        window.open(url);
    }

    getPTPHistory(userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/ptps/?expand=repayment.field_visit`;
        return this.httpManagerService.get(url);
    }

    deletePTPData(userId, dataId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/ptps/${dataId}/`;
        return this.httpClient.delete(url);
    }

    getAccountManagerList(info) {
        const url = environment.api_host + UNR_URLS.region_functionality_users
                    + `?functionality_code=${info.functionality_code}&pincode=${info.pincode}`;
        return this.httpManagerService.get(url);
    }

    updateExtraChanges(payload, userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/`;
        return this.httpManagerService.patch(url, payload);
    }

    updateForeclosure(payload, userId) {
        const url = environment.api_host + LMS_URLS.topups_details + `${userId}/foreclosure/`;
        return this.httpManagerService.post(url, payload);
    }

    getForeclosureRepayment(userId) {
        const url = environment.api_host + LMS_URLS.topups_details + `${userId}/?expand=foreclosure.repayment`;
        return this.httpManagerService.get(url);
    }

    getPendingPdcs(userId) {
        const expand = [
            'business.active_pdcs',
        ].join(',');
        let params = new HttpParams().set('expand', expand);
        const url = environment.api_host + LMS_URLS.loan_accounts + userId;
        return this.httpClient.get(url, {
            params
        });
    }

    getRpcConstants(userId) {
        const url = this.root + LMS_URLS.contactable_person + `${userId}/contactable_persons/`;
        return this.httpManagerService.get(url);
    }

    addPTP(payload, userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/ptps/`;
        return this.httpManagerService.post(url, payload);
    }

    makeExotelCall(userId, payload): Observable<any> {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/collection_calls/`;
        return this.httpManagerService.post(url, payload);
    }
    addNachPrimaryBank(payload, userId) {
        const url = environment.api_host + LMS_URLS.bussiness_details + `${userId}/banks/`;
        return this.httpManagerService.post(url, payload);
    }

    addFieldVisit(payload, userId) {
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/field_visits/`;
        return this.httpManagerService.post(url, payload);
    }


    // end loan-account-component


    // ===== Updated Implementation ======


    getRepaymentList(id, tab, options: ListOptions) {
        let params = new HttpParams().set('tab', tab);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get(this.root + LMS_URLS.loan_accounts + id + '/repayments/', {
            params
        });
    }

    getBadges(options: ListOptions) {
        const except = ['page', 'page_size '];
        let params = new HttpParams();
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<Badges>(this.root + LMS_URLS.loan_accounts + 'badges', {
            params
        });
    }

    getLoanAccounts(tab, options: ListOptions) {
        const expand = [
            'business.primary_person.person.primary_mobile',
            'business.extra.case_owner',
            'business.extra.territory_owner',
            'account_manager',
            'extra'

        ].join(',');
        let params = new HttpParams().set('tab', tab);
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get(this.root + LMS_URLS.loan_accounts, {
            params
        });
    }

    getLoanDetails(id) {
        const expand = [
            'business.primary_person.person.primary_mobile',
            'business.extra.case_owner',
            'business.extra.territory_owner',
            'business.primary_registered_address',
            'account_manager',
            'extra',
            'topups'

        ].join(',');
        const params = new HttpParams().set('expand', expand);
        return this.httpClient.get<PtpListModel>(this.root + LMS_URLS.loan_accounts + id + '/', {
            params
        });
    }

    markAbsconded(updateUrl, data) {
        return this.httpClient.patch(updateUrl, data);
    }

    getBankDetails(businessId) {
        return this.httpClient.get(this.root + CORE_URLS.businessList + businessId + '/banks/');
    }

    getBankByIFSC(ifsc) {
        return this.httpClient.get(this.root + CORE_URLS.ifsc + '?code=' + ifsc);
    }

    addBank(businessId, bank) {
        return this.httpClient.post(this.root + CORE_URLS.businessList + businessId + '/banks/', bank);
    }

    addLoanTopup(payload, userId) {
        const formData: FormData = new FormData();
        if (payload.bank.bank_statement_files != null) {
            formData.append('bank_statement_files', payload.bank.bank_statement_files);
        }

        for (const key in payload) {
            if (key === 'bank') {
                Object.entries(payload.bank).forEach(([keyX, value]) => {
                    if (keyX !== 'bank_statement_files') {
                        console.log('key', keyX, 'value', value);
                        formData.append(keyX, value.toString());
                     }
                });
            } else {
                formData.append(key, payload[key]);
            }
        }
        const url = environment.api_host + LMS_URLS.loan_accounts + `${userId}/topup_application/`;
        return this.httpManagerService.post(url, formData);
    }

    getPtpDetails(tab, options: PtpOptionModel): Observable<ListResponse<PtpListModel[]>> {
        const expand = [
           'loan_account.business,repayment.pdc,repayment.field_visit'
        ].join(',');
        let params = new HttpParams().set('tab', tab);
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<PtpListModel[]>>(this.root + LMS_URLS.ptp, {
            params
        });
    }

    getPtpBadges(options: PtpOptionModel) {
        const except = ['page', 'page_size'];
        let params = new HttpParams().set('badges', 'true');
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<PTPBadges>(this.root + LMS_URLS.ptp, {
            params
        });
    }

    getCashDetails(tab, options: CashOption): Observable<ListResponse<CashList[]>> {
        const expand = [
            'nbfc,loan_account.extra,loan_account.business.primary_person.person'
        ].join(',');
        let params = new HttpParams().set('tab', tab);
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<CashList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getCashBadges(options: CashOption) {
        const except = ['page', 'page_size'];
        let params = new HttpParams().set('badges', 'true');
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<CashBadges>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getUserList() {
        const url = environment.api_host + LMS_URLS.user + '?fields=display_name,id';
        return this.httpManagerService.get(url);
    }
    getChequeDetails(tab, options: ChequeOption): Observable<ListResponse<ChequeList[]>> {
        const expand = [
            'nbfc,loan_account.extra,loan_account.business.primary_person.person,pdc'
        ].join(',');
        let params = new HttpParams().set('tab', tab);
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<ChequeList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getChequeBadges(options: ChequeOption) {
        const except = ['page', 'page_size'];
        let params = new HttpParams().set('badges', 'true');
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<CashBadges>(this.root + LMS_URLS.repayments, {
            params
        });
    }
    getPdcDetails(tab, options: PdcOption): Observable<ListResponse<PdcList[]>> {
        const expand = [
            'loan_account,pdc'
        ].join(',');
        const fields = [
            'loan_account.loan_account_id',
            'pdc.id',
            'pdc.date',
            'pdc.amount',
            'pdc.cheque_no',
            'pdc.file',
        ].join(',');

        let params = new HttpParams().set('tab', tab);
        params = params.set('expand', expand)
            .set('fields', fields);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<PdcList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getPdcBadges(options: PdcOption) {
        const except = ['page', 'page_size'];
        let params = new HttpParams().set('badges', 'true');
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value && except.indexOf(key) === -1) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<PdcList>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getNEFTDetails(options: NEFTOption): Observable<ListResponse<NEFTList[]>> {
        const expand = [
            'loan_account.extra,loan_account.business.primary_person.person'
        ].join(',');
        let params = new HttpParams();
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<NEFTList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getNachRequestedDetails(options: ManualNachRequestedOption): Observable<ListResponse<NachRequestedList[]>> {
        const expand = [
            'loan_account.extra,loan_account.business,loan_account.nbfc,loan_account.business.primary_person.person'
        ].join(',');
        let params = new HttpParams();
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<NachRequestedList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    getNachDepositedDetails(options: ManualNachDepositedOption): Observable<ListResponse<NachDepositedList[]>> {
        const expand = [
            'nbfc,created_by'
        ].join(',');
        let params = new HttpParams();
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<NachDepositedList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    geteNachRequestedDetails(options: eNachRequestedOption): Observable<ListResponse<NachRequestedList[]>> {
        const expand = [
            'loan_account.extra,loan_account.business,loan_account.nbfc,loan_account.business.primary_person.person'
        ].join(',');
        let params = new HttpParams();
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<NachRequestedList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    geteNachDepositedDetails(options: eNachDepositedOption): Observable<ListResponse<NachDepositedList[]>> {
        const expand = [
            'nbfc,created_by'
        ].join(',');
        let params = new HttpParams();
        params = params.set('expand', expand);
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<NachDepositedList[]>>(this.root + LMS_URLS.repayments, {
            params
        });
    }

    uploadCommentThreadData1(id, data) {
        // const expand = [
        //     'attachments',
        //     'user'
        // ].join(',');
        // let params = new HttpParams();
        // params = params.set('expand', expand);

        // const temp = new FormData();
        // files.forEach(file => {
        //     temp.append('file', file);
        // });
        // Object.entries(data).forEach(([key, value]) => {
        //     temp.append(key, value.toString());
        // });

        const temp: FormData = new FormData();
        temp.append('file', data.file);
        temp.append('text', data.text);
        temp.append('app_name', 'lms');
        return this.httpClient.post(this.root + LMS_URLS.bussiness_details + id + '/comments/', temp);
    }

}




