import { LmsService } from './../../lms.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kt-ptp-field-visit',
  templateUrl: './ptp-field-visit.component.html',
  styleUrls: ['./ptp-field-visit.component.scss']
})
export class PtpFieldVisitComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private lmsService: LmsService,
    private bottomSheetRef: MatBottomSheetRef<PtpFieldVisitComponent>) { }
    public visitData = this.data;
    ngOnInit() {

    }

    map_url(url) {
        let mapUrl = "https://www.google.com/maps/preview/" + "?q" + "=" + url.selfie_lat + "," + url.selfie_long;
        return mapUrl;
    }

    onNavigate(url) {
        const newUrl = url.replace('devlsdocument', 'lssv2document');
        window.open(newUrl, '_blank');
    }
    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
