import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnrService } from '../../unr.service';
import { environment } from '../../../../environments/environment';
import { UNR_URLS } from '../../../constants/static-urls';

@Component({
    selector: 'kt-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    private baseUrl: string;
    private expand_string = "functionalities,reporting_manager,active_mapped_regions.region,permanent_address,mailing_address,mobiles,emails,emergency_contact";

    currentTab: string = 'details'
    public userId: any;
    usersInfo: any;

    constructor(
        private activateRoute: ActivatedRoute,
        private unrService: UnrService
    ) {
        this.activateRoute.params.subscribe(parms => {
            this.userId = parms.id;
        });
    }

    ngOnInit() {
        this.baseUrl = environment.api_host + UNR_URLS.userData + `${this.userId}/`
            + '?expand=' + this.expand_string;
        this.loadInitalData();
    }

    loadInitalData() {
        this.unrService.getNextPageData(this.baseUrl).subscribe((res: any) => {
            this.usersInfo = res;
        });
    }

    changeCurrentTab(tab) {
        this.currentTab = tab;
    }
}
