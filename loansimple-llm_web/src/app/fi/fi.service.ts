import { Injectable } from '@angular/core';
import { HttpManagerService } from '../services/http-manager.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FiTasks } from "../core/_models/fi-tasks.model";
import { FiTaskOptions } from "../core/_models/fi-task-options.model";
import { ListResponse } from "../shared/list-response.interface";
import { Observable } from "rxjs";
import { FI_URLS } from "../constants/static-urls";

@Injectable()
export class FiService {
    root = environment.api_host;

    constructor(
        private httpClient: HttpClient,
        private httpManagerService: HttpManagerService,
    ) {
    }

    getFiConstants() {
        const url = environment.api_host + FI_URLS.fiConstants;
        return this.httpManagerService.get(url);
    }

    getFITaskList(options: FiTaskOptions): Observable<ListResponse<FiTasks[]>> {
        const expand = [
            'business.primary_person.person.primary_mobile',
            'raised_by',
            'assigned_to',
        ].join(',');
        const fields = [
            'id','content_data','status','result','file','remark','update_url','created_at','task_id','assigned_to.display_name','business.id','business.name',
            'business.primary_person.person.primary_mobile.detail','raised_by.display_name',
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
        return this.httpClient.get<ListResponse<FiTasks[]>>(this.root + FI_URLS.tasks, {
            params
        });
    }

    updateFiDetails(payload, formData): Observable<ListResponse<FiTasks[]>> {
        return this.httpClient.patch<ListResponse<FiTasks[]>>(payload.update_url, formData);
    }
}
