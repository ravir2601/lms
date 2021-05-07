import { OnInit, ViewChild, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { ConstantService } from '../../../services/constant.service';
import { CoreService } from '../../core.service';
import { Address } from '../../_models/address.model';
import { Constant } from '../../_models/constant.model';
import { Document } from '../../_models/document.model';
import { Extra } from '../../_models/extra.model';
import { Person, BusinessPerson } from '../../_models/person.model';
import { MatBottomSheet } from '@angular/material';
import { DocumentsComponent } from '../../_partials/documents/documents.component';
import { CoApplicantFormComponent } from '../../_partials/co-applicant-form/co-applicant-form.component';
import { ApplicationsService } from '../../../applications/applications.service';
import { PersonBasicFormComponent } from '../../_partials/person-basic-form/person-basic-form.component';

@Component({
    selector: 'kt-application-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
    id = 0;
    businessId = 0;
    businessPersons: BusinessPerson[];
    businessPerson: BusinessPerson;
    addresses: { mailing_address: Address[], permanent_address: Address[] };
    newAddress: { mailing_address: boolean, permanent_address: boolean };
    suggestedAddress: Address;
    suggestedAddressExists = false;
    docs: Document[];
    extra = {};
    extraKeys = {
        pan: 'person_pan_status_data',
    };
    docExtraMap = {};

    @ViewChild('documents', { static: false })
    documents: DocumentsComponent;

    @ViewChild('basicForm', { static: false })
    basicForm: PersonBasicFormComponent;

    constructor(
        private route: ActivatedRoute,
        private coreService: CoreService,
        private commonService: CommonService,
        private applicationsService: ApplicationsService,
        private constantService: ConstantService,
        private bottomSheet: MatBottomSheet
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.getApplication();
    }

    ngOnInit() {
    }

    getApplication() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.businessId = res.business.id;
            this.getBusinessPersons();
        });
    }

    initAddresses() {
        this.addresses = {
            mailing_address: [],
            permanent_address: [],
        };
        this.newAddress = {
            mailing_address: true,
            permanent_address: true
        };
    }

    coApplicantForm() {
        this.bottomSheet.open(CoApplicantFormComponent, {
            data: {
                businessId: this.businessId
            }
        }).instance.saved.subscribe(res => {
            this.getBusinessPersons();
        });
    }

    getBusinessPersons() {
        this.coreService.getBusinessPersons(this.businessId).subscribe(res => {
            this.businessPersons = res.results;
            res.results.forEach(businessPerson => {
                if (businessPerson.is_primary) {
                    this.businessPerson = businessPerson;
                    this.suggestedAddress = this.getSuggestedAddress(businessPerson.person.common_data);
                }
            });
            this.getPersonData();
        });
    }

    getSuggestedAddress(data: Extra[]) {
        const addr = new Address();
        const res = this.commonService.objectify(data);
        const temp = res['aadhaar_parsed_data'] ? JSON.parse(res['aadhaar_parsed_data']['value']) : [];
        temp.forEach(row => {
            Object.entries(row['details']).forEach(([key, value]) => {
                if (key === 'addressSplit') {
                    addr.pincode = value['pin'];
                    addr.address_line = value['line1'] + ' ' + value['line2'];
                    addr.locality = value['locality'];
                    addr.city = value['city'];
                    addr.state = value['state'];
                }
            });
        });
        return addr;
    }

    saveSuggestedAddress(type) {
        this.commonService.confirm('Do you really want to save this Address?', () => {
            const url = this.businessPerson.person.update_url + 'addresses/';
            this.suggestedAddress.address_type = type;
            if (!this.suggestedAddress.city) {
                const stack = this.suggestedAddress.locality.split(',');
                this.suggestedAddress.city = stack[stack.length - 1].trim();
            }
            this.coreService.createAddress(url, this.suggestedAddress).subscribe(res => {
                this.commonService.showToast('The address was saved successfully', 'alert-success');
                this.onSaveAddress();
            });
        });
    }

    getPersonData() {
        this.initAddresses();
        this.getAddresses();
        this.getUploadedDocs();
        this.setExtra(this.businessPerson.person.common_data);
    }

    getExtra() {
        this.coreService.getPersonExtra(this.businessPerson.person.update_url).subscribe(res => {
            this.setExtra(res.common_data);
        });
    }

    setExtra(data) {
        this.extra = this.commonService.objectify(data);
        this.docExtraMap = {
            pan: [
                this.extra['person_pan_name_match'],
                this.extra['person_pan_dob_match'],
                this.extra['pan_with_profile_photo_match'],
                this.extra['pan_with_aadhaar_photo_match'],
                this.extra['pan_with_selfie_with_owner_photo_match'],
            ],
            aadhaar: [
                this.extra['aadhaar_name_match'],
                this.extra['aadhaar_dob_match'],
                this.extra['aadhaar_gender_match'],
                this.extra['aadhaar_mailing_address_match'],
                this.extra['aadhaar_with_profile_photo_match'],
                this.extra['aadhaar_with_selfie_with_owner_photo_match'],
                this.extra['pan_with_aadhaar_photo_match'],
            ],
        };
    }

    getAddresses() {
        this.coreService.getAddresses(this.businessPerson.person.update_url).subscribe(res => {
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
        this.getExtra();
        this.documents.ngOnChanges({});
    }

    onSaveDocument($event) {
        if ($event.method === 'post') {
            this.docs.push($event.data);
        }
        this.getExtra();
        this.basicForm.ngOnChanges({});
    }

    parseAddresses(addresses) {
        this.suggestedAddressExists = false;
        this.initAddresses();
        addresses.forEach(row => {
            this.addresses[row.address_type].push(row);
            const tmp = this.commonService.objectify(row.common_data);
            if (tmp['aadhaar_address_match'] && tmp['aadhaar_address_match']['value'] > 80) {
                this.suggestedAddressExists = true;
            }
        });
        this.newAddress.mailing_address = (this.addresses.mailing_address.length === 0);
        this.newAddress.permanent_address = (this.addresses.permanent_address.length === 0);
    }

    getUploadedDocs() {
        this.coreService.getDocuments(this.businessPerson.person.update_url).subscribe(res => {
            this.docs = res.results;
        });
    }
}
