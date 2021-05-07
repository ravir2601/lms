import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CORE_URLS, UNR_URLS, LOS_URLS } from '../constants/static-urls';
import { ListResponse } from '../shared/list-response.interface';
import { Region } from '../core/_models/region.model';
import { BeautifyStringPipe } from '../shared/pipes/beautify-string.pipe';
import { BusinessCategory, BusinessVertical } from '../core/_models/constant.model';
import { Nbfc } from '../core/_models/nbfc.model';

@Injectable()
export class ConstantService {

    url = environment.api_host + CORE_URLS.constants;
    losUrl = environment.api_host + LOS_URLS.constants;
    unrUrl = environment.api_host + UNR_URLS.regions;
    flatten_constants = {};

    public constants_subject: BehaviorSubject<{}> = new BehaviorSubject({});
    public los_constants_subject: BehaviorSubject<{}> = new BehaviorSubject({});
    public flatten_constants_subject: BehaviorSubject<{}> = new BehaviorSubject({});
    public states_subject: BehaviorSubject<Region[]> = new BehaviorSubject([]);

    constructor(
        private httpClient: HttpClient
    ) {
        if (Object.keys(this.constants_subject.value).length <= 0) {
            this.getConstants();
        }
        if (Object.keys(this.los_constants_subject.value).length <= 0) {
            this.getLosConstants();
        }
        if (Object.keys(this.states_subject.value).length <= 0) {
            this.getStates();
        }
    }

    getConstants() {
        this.httpClient.get(this.url).subscribe(response => {
            this.constants_subject.next(response);
        });
        this.getFlattenConstants(this.url);
    }

    getLosConstants() {
        this.httpClient.get(this.losUrl).subscribe(response => {
            this.los_constants_subject.next(response);
        });
        this.getFlattenConstants(this.losUrl);
    }

    getFlattenConstants(url) {
        this.httpClient.get(url, {
            params: new HttpParams().set('flatten', 'true')
        }).subscribe(response => {
            this.setFlatten(response['items']);
        });
    }

    setFlatten(items) {
        items.forEach((obj) => {
            this.flatten_constants[obj.value] = obj.name;
        });
        this.flatten_constants_subject.next(this.flatten_constants);
    }

    getName(value) {
        const beautifyPipe = new BeautifyStringPipe();
        return this.flatten_constants_subject.value[value] || beautifyPipe.transform(value);
    }

    getNameRaw(value) {
        return this.flatten_constants_subject.value[value] || value;
    }

    getBusinessVerticals(): Observable<ListResponse<BusinessVertical[]>> {
        return this.httpClient.get<ListResponse<BusinessVertical[]>>(environment.api_host + CORE_URLS.businessVerticals);
    }

    getBusinessCategories(business_model, business_vertical): Observable<ListResponse<BusinessCategory[]>> {
        return this.httpClient.get<ListResponse<BusinessCategory[]>>(environment.api_host + CORE_URLS.categories, {
            params: new HttpParams().set('business_vertical', business_vertical)
                .set('business_model', business_model)
        });
    }

    getStates() {
        this.httpClient.get<ListResponse<Region[]>>(this.unrUrl, {
            params: new HttpParams().set('type', 'state')
                .set('page_size', '50')
        }).subscribe(response => {
            this.states_subject.next(response.results);
        });
    }

    getSubRegions(type, parent) {
        return this.httpClient.get<ListResponse<Region[]>>(this.unrUrl, {
            params: new HttpParams().set('type', type)
                .set('belongs_to__name', parent)
                .set('is_approved', 'true')
                .set('page_size', '10000')
        });
    }

    getNbfcs() {
        return this.httpClient.get<ListResponse<Nbfc[]>>(environment.api_host + CORE_URLS.nbfcs);
    }
}
