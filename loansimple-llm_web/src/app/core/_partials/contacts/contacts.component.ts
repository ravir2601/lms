import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { CoreService } from '../../core.service';
import { Contact } from '../../_models/contact.model';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'kt-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
    @Input() personUrl: string;
    @Input() type: string;
    @Input() title: string;
    @Input() fluid = true;

    contacts: Contact[];
    safe = ['detail', 'type', 'is_primary', 'is_notifiable'];
    contact = new Contact();

    constructor(
        private bottomSheet: MatBottomSheet,
        private coreService: CoreService,
        private commonService: CommonService
    ) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.getData();
    }

    getData() {
        this.coreService.getContacts(this.personUrl, this.type).subscribe((res: any) => {
            this.contacts = res.results;
        });
    }

    saveContact() {
        this.contact.type = this.type;
        this.contact.is_notifiable = true;
        this.coreService.addContacts(
            this.personUrl,
            this.commonService.filterSafe(this.contact, this.safe)
        ).subscribe(res => {
            this.commonService.showToast(this.title + ' were saved successfully', 'alert-success');
            this.getData();
            this.contact = new Contact();
        });
    }

    delete(contact: Contact) {
        this.commonService.confirm('Do you want to delete this ' + this.title + ' ?', () => {
            this.coreService.delete(contact.update_url).subscribe(res => {
                this.commonService.showToast(
                    this.title + ' deleted successfully',
                    'alert-success'
                );
                this.getData();
            });
        });
    }

    primaryContact(contact) {
        this.coreService.updateContact(contact.update_url, {
            is_primary: true
        }).subscribe(res => {
            this.commonService.showToast(this.title + ' has been updated successfully', 'alert-success');
        });
    }

    verifyDetails() {
        this.bottomSheet.open(OtpVerificationComponent);
    }
}
