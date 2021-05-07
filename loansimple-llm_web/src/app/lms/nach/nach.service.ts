import { HttpManagerService } from './../../services/http-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class NachService {

    constructor(private httpClient: HttpClient, private httpManagerService: HttpManagerService) { }

    url1 = 'http://stagls.loansimple.in/api/v2/lms/deposited_nach_groups/?expand=nbfc,created_by&is_processed=False&nbfc=&search=';

    filterData: string = '';

    private filterList = new BehaviorSubject<any>(this.filterData);
    currentFilterData = this.filterList.asObservable();

    filterDataList(req: any) {
        this.filterList.next(req);
        console.log(req);
    }

    get_Nach(url) {
        return this.httpManagerService.get(url);
    }
    get_deposite() {
        return this.httpManagerService.get(this.url1);
    }
    get_requested(url) {
        return this.httpManagerService.get(url);
    }

    getNach(url, page?, pageSize?): Observable<any> {
        let _page = page || 1;
        let _pageSize = pageSize.toString() || 15;
        console.log('inside NachService', page, pageSize);
        return this.httpManagerService.get(url + '&page=' + _page + '&page_size=' + _pageSize);
    }

    updateNach(url, data: File) {
        const formData: FormData = new FormData();
        formData.append('txn_file', data);
        return this.httpManagerService.put(url, formData);
    }

    uploadNachData(url, data) {
        return this.httpManagerService.post(url, data);
    }
}
