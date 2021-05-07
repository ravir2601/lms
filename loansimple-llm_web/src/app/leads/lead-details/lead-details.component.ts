import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd, ActivationStart, ActivationEnd } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { Business } from '../../core/_models/business.model';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
    selector: 'kt-lead-details',
    templateUrl: './lead-details.component.html',
    styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit, OnDestroy {
    data: Business;
    private unsubscribe: Subscription[] = [];
    constructor(
        private coreService: CoreService,
        private bottomSheet: MatBottomSheet,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title
    ) {
        this.unsubscribe.push(this.coreService.getBusiness(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            this.data = res;
            this.title.setTitle(res.name);
        }));
    }

    ngOnInit() {
        this.unsubscribe.push(this.router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                if (event.snapshot.data.suffix) {
                    this.title.setTitle(this.data.name + ' :: ' + event.snapshot.data.suffix);
                }
            }
        }));
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(sb => sb.unsubscribe());
    }
}
