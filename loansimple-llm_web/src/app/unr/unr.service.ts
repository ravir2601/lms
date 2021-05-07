import { Injectable } from '@angular/core';
import { HttpManagerService } from '../services/http-manager.service';
import { environment } from '../../environments/environment';
import { UNR_URLS } from "../constants/static-urls";
import { CommonService } from '../services/common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { unrUsers } from "../core/_models/unr.model";
import { UserListOptions } from "../core/_models/user-list-options.model";
import { ListResponse } from "../shared/list-response.interface";
import { Contact } from "../core/_models/contact.model";
import { UserLogoutLoginHistory } from "../core/_models/user-logout-login-history.model";
import { unrRegions } from "../core/_models/unr-regions.model";

@Injectable()
export class UnrService {
    unr_constants: any;
    root = environment.api_host;

    constructor(
        private httpClient: HttpClient,
        private httpManagerService: HttpManagerService,
        private commonService: CommonService
    ) {
        this.getUnrConstants();
        this.getFlattenConstants();
        this.getFunctionalityData();
        this.getReportingMangerPositionsData();
    }

    getFlattenConstants() {
        const url = environment.api_host + UNR_URLS.unr_constants + '?flatten=True';
        return this.httpManagerService.get(url).subscribe((res: any) => {
            const flattenConstants = res;
            flattenConstants.items.push({
                name: "Team Mobile Application",
                value: "team_mobile_app"
            });
            this.commonService.setFlattenConstantsMap(flattenConstants.items);
        });
    }

    getUsers(options: UserListOptions): Observable<ListResponse<unrUsers[]>> {
        const expand = [
            'primary_mobile',
            'primary_email',
            'reporting_manager',
        ].join(',');
        const fields = [
            'emp_code','id','full_name','username','mobile','email','last_login',
            'is_active','reporting_manager.display_name',
        ].join(',');
        let params = new HttpParams().set('expand', expand)
            .set('fields', fields)
            .set('pagination', '1')
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<unrUsers[]>>(this.root + UNR_URLS.userData, {
            params
        });
    }

    getRegions(options: UserListOptions): Observable<ListResponse<unrRegions[]>> {
        let params = new HttpParams()
            .set('expand', 'belongs_to')
            .set('pagination', '1')
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<unrRegions[]>>(this.root + UNR_URLS.regions, {
            params
        });
    }

    getReportingMangerPositionsData() {
        const url = environment.api_host + UNR_URLS.userData + '?expand=reporting_manager,functionalities';
        return this.httpManagerService.get(url);
    }

    getContacts(userUrl) {
        return this.httpClient.get(userUrl + 'mobiles/', {
        });
    }

    addContacts(userUrl, data) {
        return this.httpClient.post<Contact>(userUrl + 'mobiles/', data);
    }

    getEmails(userUrl) {
        return this.httpClient.get(userUrl + 'emails/', {
        });
    }

    addEmails(userUrl, data) {
        return this.httpClient.post<Contact>(userUrl + 'emails/', data);
    }

    updateContact(updateUrl, data) {
        return this.httpClient.patch(updateUrl, data);
    }

    delete(url) {
        return this.httpClient.delete(url);
    }

    getNextPageData(payload, page?, pageSize?, search?) {
        let _page = page ? page : 1;
        let _pageSize = pageSize ? pageSize.toString() : 15;
        let _search = search ? search : '';
        return this.httpManagerService.get(payload + '&page=' + _page + '&page_size=' + _pageSize + '&search=' + _search);
    }

    addNewUser(payload) {
        const url = environment.api_host + UNR_URLS.userData;
        return this.httpManagerService.post(url, payload);
    }

    updateUserDetails(payload) {
        const url = environment.api_host + UNR_URLS.userData + `${payload.id}/`;
        return this.httpManagerService.patch(url, payload);
    }

    updateUserFunctionality(payload, id) {
        const url = environment.api_host + UNR_URLS.userData + `${id}/`;
        return this.httpManagerService.patch(url, payload);
    }

    addNewFuctionality(payload) {
        const url = environment.api_host + UNR_URLS.functionalities;
        return this.httpManagerService.post(url, payload);
    }

    updateNewFuctionality(payload, id) {
        const url = environment.api_host + UNR_URLS.functionalities + `${id}/`;
        return this.httpManagerService.patch(url, payload);
    }

    addNewRegion(payload) {
        const url = environment.api_host + UNR_URLS.regions;
        return this.httpManagerService.post(url, payload);
    }

    updateNewRegion(payload, id) {
        const url = environment.api_host + UNR_URLS.regions + `${id}/`;
        return this.httpManagerService.patch(url, payload);
    }

    getFunctionalityData() {
        const url = environment.api_host + UNR_URLS.functionalities + '?expand=-all';
        return this.httpManagerService.get(url);
    }

    getMapperRegions(id) {
        const url = environment.api_host + UNR_URLS.userData + id + '/' + 'active_mapped_regions';
        return this.httpManagerService.get(url);
    }
    getUnrConstants() {
        const url = environment.api_host + UNR_URLS.unr_constants;
        return this.httpManagerService.get(url).subscribe(res => {
            this.unr_constants = res;
        });
    }

    evaluteInsertionForList(isChecked, arr, id) {
        if (isChecked) {
            arr.push(id);
        } else {
            const index = arr.findIndex(el => el === id);
            arr.splice(index, 1);
        }
    }

    userCurrentActionHistories(id) {
        const url = environment.api_host + UNR_URLS.userData + id + '/action_history/';
        return this.httpManagerService.get(url);
    }


    userActionHistories(id, options: UserListOptions): Observable<ListResponse<UserLogoutLoginHistory[]>> {
        let params = new HttpParams()
            .set('pagination', '1')
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            }
        );
        return this.httpClient.get<ListResponse<UserLogoutLoginHistory[]>>(this.root + UNR_URLS.userData + id + '/action_history/', {
            params
        });
    }
}
