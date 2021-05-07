import { Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { LMS_URLS, LMS_CONST, UNR_URLS } from './../../../../../../constants/static-urls';

@Component({
    selector: 'kt-field-visit-details',
    templateUrl: './field-visit-details.component.html',
    styleUrls: ['./field-visit-details.component.scss']
})
export class FieldVisitDetailsComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public fieldVisitData: any
    ) { }
    public data: any;

    ngOnInit() {
        this.data = this.fieldVisitData;
    }

    dismiss() {
        this.bottomSheetRef.dismiss('openPreviousSheet');
    }

    openAttachment(selfieUrl) {
        const attachmentUrl = selfieUrl.replace('devlsdocument', 'lssv2document');
        window.open(attachmentUrl, '_blank');
    }
    openMap(lat, long) {
        const mapUrl = LMS_URLS.mapUrl + lat + ',' + long;
        window.open(mapUrl, '_blank');
    }
}
