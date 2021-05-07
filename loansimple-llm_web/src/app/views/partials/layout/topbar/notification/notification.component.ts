// Angular
import {Component, Input, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {LeadsService} from '../../../../../leads/leads.service';
import {Business} from '../../../../../core/_models/business.model';
import {Notifications} from './notification-list.interface';
import {MatBottomSheet} from '@angular/material';
import {HttpClient} from '@angular/common/http';


@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss']
})
export class NotificationComponent implements OnInit {

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(private sanitizer: DomSanitizer,
             private bottomSheet: MatBottomSheet,
             private leadsService: LeadsService,
             private httpClient: HttpClient) {
	}
    listReminder: Notifications<Business[]>;
    list: Business[];
    array = [];
    nextPageUrl: string = null;
    loading = false;
    private nextUrlData = [];


    // Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon: string = 'flaticon2-bell-alarm-symbol';
	@Input() iconType: '' | 'success';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() type: 'brand' | 'success' = 'success';

    private data: any;

    ngOnInit() {
        this.getReminder(this.nextPageUrl);
    }

    getDetails(data) {
        // do the thing
        this.data = data;
    }

    getReminder(url) {
        this.loading = true;
        this.leadsService.getReminders(url).subscribe(res => {
            this.list = res.results;
            this.listReminder = res;
            this.nextPageUrl = null;
            if (this.listReminder.next) {
                this.nextPageUrl = this.listReminder.next;
            }
            this.loading = false;
        });
    }

    nextPage() {
        if (this.nextPageUrl !== null) {
            this.getReminder(this.nextPageUrl);
        }
    }

    backgroundStyle(): string {
        if (!this.bgImage) {
            return 'none';
        }
        return 'url(' + this.bgImage + ')';
    }

}
