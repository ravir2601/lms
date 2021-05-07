import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../../applications/applications.service';
import { Address } from '../../_models/address.model';
import { Document } from '../../_models/document.model';
import { DocumentsComponent } from '../../_partials/documents/documents.component';
import { CommonService } from './../../../services/common.service';
import { ConstantService } from './../../../services/constant.service';
import { CoreService } from './../../core.service';
import { Business } from './../../_models/business.model';

@Component({
    selector: 'kt-application-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
    id = 0;
    businessId = 0;
    businessDetails: Business;
    addresses: { mailing_address: Address[], registered_address: Address[] };
    newAddress: { mailing_address: boolean, registered_address: boolean };
    docs: Document[];
    @ViewChild('documents', { static: false })
    documents: DocumentsComponent;

    constructor(
        private coreService: CoreService,
        private applicationsService: ApplicationsService,
        private route: ActivatedRoute,
        private constantService: ConstantService,
        private commonService: CommonService
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.initAddresses();
        this.getApplication();
    }

    ngOnInit() { }

    getApplication() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.businessDetails = res.business;
            this.businessId = res.business.id;
            this.getUploadedDocs();
            this.getAddresses();
        });
    }

    initAddresses() {
        this.addresses = { mailing_address: [], registered_address: [], };
        this.newAddress = { mailing_address: true, registered_address: true };
    }

    getAddresses() {
        this.coreService.getAddresses(this.businessDetails.update_url).subscribe(res => {
            this.parseAddresses(res.results);
        });
    }

    addAddress(type) {
        if (this.newAddress[type]) {
            this.commonService.showError('You already have an unsaved address, please save before continuing');
        } else {
            this.newAddress[type] = true;
        }
    }

    onSaveAddress() {
        this.getAddresses();
        this.documents.ngOnChanges({});
    }

    parseAddresses(addresses) {
        this.initAddresses();
        addresses.forEach(row => {
            if (this.addresses[row.address_type]) {
                this.addresses[row.address_type].push(row);
            }
        });
        this.newAddress.mailing_address = (this.addresses.mailing_address.length === 0);
        this.newAddress.registered_address = (this.addresses.registered_address.length === 0);
    }

    getUploadedDocs() {
        this.coreService.getDocuments(this.businessDetails.update_url).subscribe(res => {
            this.docs = res.results;
        });
    }
}
