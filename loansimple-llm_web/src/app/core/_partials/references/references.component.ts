import { CommonService } from './../../../services/common.service';
import { OtherContact } from './../../_models/other-contact.model';
import { CoreService } from './../../core.service';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ReferenceFormComponent } from './reference-form/reference-form.component';

@Component({
    selector: 'kt-references',
    templateUrl: './references.component.html',
    styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit, OnChanges {
    @Input() type: string;
    @Input() title: string;
    @Input() formTitle: string;
    @Input() rootUrl: string;
    @Input() relationsKey: string;
    @Input() limit = 5;
    @Input() extra = {};
    @Input() fluid = false;
    contact: OtherContact[];
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

    openRefForm(reference) {
        const refForm = this.bottomSheet.open(ReferenceFormComponent, {
            data: {
                title: this.formTitle,
                rootUrl: this.rootUrl,
                type: this.type,
                referenceDetails: reference,
                relationsKey: this.relationsKey
            }
        });
        refForm.afterDismissed().subscribe(res => {
            if (res.key === 'success') {
                this.getData();
                this.commonService.showToast(
                    this.title + res.msg,
                    'alert-success'
                );
            }
        }, err => {
        });
    }

    getData() {
        this.coreService.getOtherContacts(this.rootUrl, this.type)
            .subscribe((res: any) => {
                this.contact = res.results;
            });
    }

    delete(contact: OtherContact) {
        this.commonService.confirm('Do you want to delete this ' + this.title + ' details' , () => {
            this.coreService.delete(contact.update_url).subscribe(res => {
                this.commonService.showToast(
                    this.title + ' deleted successfully',
                    'alert-success'
                );
                this.getData();
            });
        });
    }
}
